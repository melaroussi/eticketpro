const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:8080/presentation/index.html';
const TEMP_SLIDES_DIR = '/tmp/slides_capture';
const OUTPUT_PDF = '/output/eTicket_Pro_Presentation_Musee.pdf';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (!fs.existsSync(TEMP_SLIDES_DIR)) {
    fs.mkdirSync(TEMP_SLIDES_DIR, { recursive: true });
  }

  console.log('Launching browser for PDF deck generation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1.5 });

  console.log('Loading presentation page...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(2000);

  // Hide top bar and bottom dock to get pure clean presentation slides
  await page.evaluate(() => {
    const topBar = document.querySelector('.top-bar');
    const bottomDock = document.querySelector('.bottom-dock');
    const progressTrack = document.querySelector('.progress-track');
    if (topBar) topBar.style.display = 'none';
    if (bottomDock) bottomDock.style.display = 'none';
    if (progressTrack) progressTrack.style.display = 'none';
    
    const container = document.querySelector('.presentation-container');
    if (container) {
      container.style.marginTop = '0px';
      container.style.marginBottom = '0px';
      container.style.height = '100vh';
      container.style.padding = '30px';
    }
  });

  const slideDataUrls = [];
  const TOTAL_SLIDES = 14;

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    console.log(`Capturing Slide ${i} of ${TOTAL_SLIDES}...`);
    await page.evaluate((slideNum) => {
      goToSlide(slideNum);
    }, i);

    // If slide 9 (MQTT simulator), trigger simulation so it shows active verified gate
    if (i === 9) {
      await page.evaluate(() => {
        const simBtn = document.getElementById('btnSimulateScan');
        if (simBtn) simBtn.click();
      });
      await delay(1000);
    }

    await delay(1000);

    const slideImgPath = path.join(TEMP_SLIDES_DIR, `slide_${i.toString().padStart(2, '0')}.png`);
    await page.screenshot({ path: slideImgPath });
    
    // Read as base64 data URL
    const b64 = fs.readFileSync(slideImgPath).toString('base64');
    slideDataUrls.push(`data:image/png;base64,${b64}`);
  }

  console.log('All 14 slides captured and encoded! Generating final PDF document...');

  // Create an HTML wrapper with embedded base64 images
  const pdfHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @page {
        size: 1920px 1080px;
        margin: 0;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: #070d19;
        margin: 0;
        padding: 0;
      }
      .slide-page {
        width: 1920px;
        height: 1080px;
        page-break-after: always;
        break-after: page;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .slide-page img {
        width: 1920px;
        height: 1080px;
        display: block;
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    ${slideDataUrls.map((dataUrl) => `
      <div class="slide-page">
        <img src="${dataUrl}" />
      </div>
    `).join('')}
  </body>
  </html>
  `;

  const pdfPage = await browser.newPage();
  await pdfPage.setViewport({ width: 1920, height: 1080 });
  await pdfPage.setContent(pdfHtml, { waitUntil: 'networkidle0' });
  await delay(1500);

  await pdfPage.pdf({
    path: OUTPUT_PDF,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log(`SUCCESS! High-definition presentation PDF generated at: ${OUTPUT_PDF}`);

  await browser.close();
}

main().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
