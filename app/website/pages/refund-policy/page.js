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
    <>
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

            <Typography variant="h4">Accsellium Refund Policy</Typography>

            <Box sx={{ pt: 4, pb: 4 }}/>

            <Typography variant="h6">Introduction</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            At Accsellium, we strive to provide our clients with exceptional digital engineering services that exceed expectations. However, we understand that there may be circumstances where a refund is necessary. Please read our refund policy carefully to understand your rights and obligations regarding refunds for our services.
            </Typography>
            <Typography variant="h6">1. Scope of Refund Policy</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            This refund policy applies to all services provided by Accsellium, including but not limited to software development, website design, mobile application development, and consulting services.
            </Typography>
            <Typography variant="h6">2. Eligibility for Refunds</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Accsellium offers refunds under the following circumstances:

            - Service Dissatisfaction: If you are unsatisfied with the quality of our service or the deliverables provided, you may request a refund.
            - Service Discontinuation: If Accsellium is unable to fulfill its obligations outlined in the service agreement due to unforeseen circumstances or if the project is terminated before completion, you may be eligible for a refund of any unused portion of the payment.
            - Duplicate Payments: In the event of accidental duplicate payments, we will refund the excess amount promptly upon verification.
            </Typography>
            <Typography variant="h6">3. Refund Procedure</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            To request a refund, please follow these steps:

            - Contact our customer support team at [contact@email.com] within 30 days of service delivery or termination of the project.
            - Provide detailed reasons for your refund request, including any relevant documentation or evidence to support your claim.
            - Our team will review your request and respond within [X] business days to inform you whether your request has been approved or denied.
            </Typography>
            <Typography variant="h6">4. Refund Processing</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            If your refund request is approved, Accsellium will process the refund within [X] business days using the original method of payment. Please note that it may take additional time for the refunded amount to reflect in your account, depending on your financial institution's processing times.
            </Typography>
            <Typography variant="h6">5. Non-Refundable Items</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            The following items are non-refundable:
            - Any expenses incurred by Accsellium on behalf of the client, such as third-party software licenses, domain registrations, or hosting fees.
            - Services that have been fully completed and delivered as per the agreed-upon specifications.
            </Typography>
            <Typography variant="h6">6. Dispute Resolution</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            If you disagree with our decision regarding your refund request, you may initiate a dispute resolution process by contacting our management team at [management@email.com]. We are committed to resolving disputes in a fair and timely manner.
            </Typography>
            <Typography variant="h6">7. Changes to Refund Policy</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Accsellium reserves the right to modify or amend this refund policy at any time without prior notice. Any changes will be effective immediately upon posting on our website. It is your responsibility to review this policy periodically to stay informed about our refund procedures.
            </Typography>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            If you have any questions or concerns about our refund policy, please don't hesitate to contact us at : contact@accsellium.com. Our customer support team is available to assist you and address any inquiries you may have.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
            Thank you for choosing Accsellium for your digital engineering needs. We appreciate your trust in our services.
            </Typography>

            <Typography variant="caption">Effective Date: December 1, 2023</Typography>
            <Typography variant="body1">Dr. Smail Tigani</Typography>
            <Typography variant="body2">Founder, CEO/CTO @ Accsellium</Typography>
          
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Footer/>
    </>
  );
}