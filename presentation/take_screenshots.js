const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/screenshots';
const BASE_URL = 'http://127.0.0.1:8080';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching browser in high-res mode...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1600,1050'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1050, deviceScaleFactor: 1.25 });

  try {
    // 1. Landing Page - Hero & Quick Simulator
    console.log('1. Capturing Website Hero...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_hero_home.png') });

    // 2. Landing Page - Cultural Galleries
    console.log('2. Capturing Cultural Galleries...');
    await page.evaluate(() => {
      const el = document.getElementById('biozones-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_galleries.png') });

    // 3. Landing Page - Pricing Grids
    console.log('3. Capturing Pricing Cards...');
    await page.evaluate(() => {
      const el = document.getElementById('pricing-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_pricing.png') });

    // 4. Landing Page - Partnership & Footer
    console.log('4. Capturing Partnership & Footer...');
    await page.evaluate(() => {
      const el = document.getElementById('somayar-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_partnership.png') });

    // 5. Auth Portal
    console.log('5. Capturing Login Portal...');
    await page.goto(`${BASE_URL}/application`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05_login_portal.png') });

    // 6. Manager Dashboard Login
    console.log('6. Logging into Manager Dashboard...');
    await page.type('input[type="email"]', 'admin@e-ticket-pro.ma');
    await page.type('input[type="password"]', '0000');
    await page.click('button[type="submit"]');
    await delay(5000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06_manager_dashboard.png') });

    // 7. Manager Analytics
    console.log('7. Capturing Manager Analytics...');
    await page.goto(`${BASE_URL}/application/manager/tickets/analytics`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(4000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07_manager_analytics.png') });

    // 8. Manager Subscriptions & RFID Cards
    console.log('8. Capturing Subscriptions & Pass Culture...');
    await page.goto(`${BASE_URL}/application/manager/subscriptions`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(3500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08_manager_subscriptions.png') });

    // 9. Cashier Ticket POS List
    console.log('9. Capturing Cashier Tickets POS...');
    await page.goto(`${BASE_URL}/application`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(1500);
    await page.type('input[type="email"]', 'cashier@e-ticket-pro.ma');
    await page.type('input[type="password"]', '0000');
    await page.click('button[type="submit"]');
    await delay(4000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09_cashier_pos_list.png') });

    // 10. Cashier Add Sale
    console.log('10. Capturing Cashier Add Sale...');
    await page.goto(`${BASE_URL}/application/cashier/tickets/add-sell`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(3000);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const pleintarifBtn = btns.find(b => b.textContent.includes('Plein Tarif') || b.textContent.includes('famille'));
      if (pleintarifBtn) pleintarifBtn.click();
    });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10_cashier_pos_add.png') });

    // 11. Cashier Boutique & Librairie
    console.log('11. Capturing Cashier Boutique POS...');
    await page.goto(`${BASE_URL}/application/cashier/articles`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(3500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '11_cashier_boutique.png') });

    // 12. Interactive Kiosk - Language Selection
    console.log('12. Capturing Interactive Kiosk - Languages...');
    await page.goto(`${BASE_URL}/application/kiosk`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '12_kiosk_welcome.png') });

    // 13. Interactive Kiosk - Ticket Selection & Cart Fill
    console.log('13. Capturing Interactive Kiosk - Ticket Select & Cart...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Français'));
      if (btn) btn.click();
    });
    await delay(2500);
    // Click '+' buttons on tickets to fill cart
    await page.evaluate(() => {
      const cards = document.querySelectorAll('div[class*="MuiPaper-root"], div[class*="MuiCard-root"]');
      const addBtns = Array.from(document.querySelectorAll('button')).filter(b => b.querySelector('svg[data-testid="AddIcon"]'));
      if (addBtns.length > 0) addBtns[0].click();
      if (addBtns.length > 2) addBtns[2].click();
    });
    await delay(1500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '13_kiosk_tickets.png') });

    console.log('ALL SCREENSHOTS CAPTURED PERFECTLY!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

main();
