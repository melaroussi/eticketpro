"use client"
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
        
            <Typography variant="h4">Accsellium Privacy Policy</Typography>

            <Box sx={{ pt: 4, pb: 4 }}/>

            <Typography variant="h6">Introduction</Typography>

            <Typography variant="body1" color="text.primary" paragraph>
            At Accsellium, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide to us when you visit our website or use our services. By accessing or using our website or services, you agree to the terms of this Privacy Policy.
            </Typography>
            <Typography variant="h6">Information We Collect:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            1. Personal Information: We may collect personal information such as your name, email address, phone number, and company name when you voluntarily provide it to us, for example, when you fill out a contact form or sign up for our services.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            2. Usage Information: We automatically collect certain information about your usage of our website and services, including your IP address, browser type, operating system, pages visited, and the dates and times of your visits.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            3. Cookies: We use cookies and similar tracking technologies to enhance your experience on our website and to analyze how users interact with it. You can control cookies through your browser settings, but please note that disabling cookies may affect your ability to access certain features of our website.
            </Typography>

            <Typography variant="h6">How We Use Your Information:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            1. To Provide Services: We use the information we collect to provide and improve our services, including software development, data science, artificial intelligence, eCommerce solutions, and online training.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            2. Communications: We may use your contact information to communicate with you about our services, respond to your inquiries, provide customer support, and send you relevant updates and promotional materials.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            3. Analytics: We analyze usage data to understand how visitors interact with our website and services, identify trends, and make improvements to enhance user experience.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            4. Legal Compliance: We may use your information as required by applicable laws, regulations, or legal processes, or to protect our rights, property, or safety and that of others.
            </Typography>
            <Typography variant="h6">Data Sharing and Disclosure:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            1. Service Providers: We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or providing services to you, such as hosting providers, analytics providers, and payment processors.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            2. Business Transfers: In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to a successor or acquiring entity.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            3. Legal Requirements: We may disclose your information when required to comply with applicable laws, regulations, legal processes, or government requests.
            </Typography>
            <Typography variant="h6">Data Security:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            We implement reasonable security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Typography>
            <Typography variant="h6">Your Rights:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            You have the right to access, correct, update, or delete your personal information. If you would like to exercise any of these rights or have any questions about our Privacy Policy, please contact us using the information provided below.
            </Typography>
            <Typography variant="h6">Changes to This Privacy Policy:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            We reserve the right to update or modify this Privacy Policy at any time without prior notice. We will notify you of any changes by posting the updated Privacy Policy on our website with the effective date indicated at the top. Your continued use of our website or services after the posting of any changes constitutes acceptance of those changes.
            </Typography>
            <Typography variant="h6">Contact Us:</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at: contact@accsellium.com
            </Typography>

            <Typography variant="body1" color="text.primary" paragraph>
            Thank you for entrusting Accsellium with your personal information. We are committed to protecting your privacy and providing you with the best possible experience.
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