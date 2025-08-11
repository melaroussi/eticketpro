import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import AllInboxIcon from '@mui/icons-material/AllInbox'
           
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ThemeProvider from '@mui/system/ThemeProvider';

import Footer from '../../sections/footer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppBar position="relative" color='inherit'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: {  xs: 'flex', md: 'flex' } }}>
            <img src="/images/accsellium-logo-v1.png" height={50}/>
          </Box>
          <Box sx={{ flexGrow: 1, display: {  xs: 'none', md: 'flex' } }}/>
          <Box sx={{ flexGrow: 0, display: {  xs: 'flex', md: 'flex' } }}>
            <Button onClick={null} sx={{ my: 2, color: 'inherit', display: 'block' }}>
              Back
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box sx={{ pt: 8, pb: 6 }}>

          <Container maxWidth="md">
        
            <Typography variant="h4">Accsellium Terms of Service</Typography>

            <Box sx={{ pt: 4, pb: 4 }}/>

            <Typography variant="h6">Introduction</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Welcome to Accsellium! These Terms of Service ("Terms") govern your use of our services, including software development, data science, artificial intelligence (AI), eCommerce solutions, and online training ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </Typography>
            <Typography variant="h6">1. Acceptance of Terms</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            By accessing or using our Services, you agree to be bound by these Terms and any additional terms and conditions that may apply to specific Services. If you do not agree to these Terms, you may not use our Services.
            </Typography>
            <Typography variant="h6">2. Description of Services</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Accsellium provides digital engineering services including software development, data science, artificial intelligence (AI), eCommerce solutions, and online training. We strive to deliver high-quality services tailored to meet the needs of our clients.
            </Typography>
            <Typography variant="h6">3. Use of Services</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            You agree to use our Services only for lawful purposes and in compliance with these Terms and all applicable laws and regulations. You may not use our Services in any manner that could damage, disable, overburden, or impair our servers or networks.
            </Typography>
            <Typography variant="h6">4. Intellectual Property</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            All content included in our Services, such as text, graphics, logos, images, audio clips, video clips, data, software, and other materials, is the property of Accsellium or its licensors and is protected by intellectual property laws.
            </Typography>
            <Typography variant="h6">5. Confidentiality</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            We understand the importance of confidentiality in our client relationships. Any information shared with Accsellium in the course of providing Services will be treated as confidential and will not be disclosed to third parties without your consent, except as required by law.
            </Typography>
            <Typography variant="h6">6. Payment</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Payment for our Services will be as agreed upon in the contract or as specified on our website. Payment terms may vary depending on the nature of the Services provided.
            </Typography>
            <Typography variant="h6">7. Disclaimer of Warranties</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Our Services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Accsellium does not warrant that our Services will be uninterrupted or error-free, or that any defects will be corrected.
            </Typography>
            <Typography variant="h6">8. Limitation of Liability</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            In no event shall Accsellium or its affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, arising out of or in connection with your use of our Services.
            </Typography>
            <Typography variant="h6">9. Indemnification</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            You agree to indemnify and hold Accsellium and its affiliates, officers, directors, employees, and agents harmless from any claims, losses, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of our Services.
            </Typography>
            <Typography variant="h6">10. Governing Law</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.
            </Typography>
            <Typography variant="h6">11. Changes to Terms</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Accsellium reserves the right to update or modify these Terms at any time without prior notice. Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
            </Typography>
            <Typography variant="h6">12. Contact Us</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            If you have any questions or concerns about these Terms, please contact us at : contact@accsellium.com
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Thank you for choosing Accsellium! We look forward to serving you.
            </Typography>

            <Typography variant="caption">Effective Date: December 1, 2023</Typography>
            <Typography variant="body1">Dr. Smail Tigani</Typography>
            <Typography variant="body2">Founder, CEO/CTO @ Accsellium</Typography>

          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}