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
        
            <Typography variant="h4">Accsellium Gender Equality Policy</Typography>

            <Box sx={{ pt: 4, pb: 4 }}/>
            
            <Typography variant="h6">1. Introduction</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Accsellium is committed to fostering a workplace culture that promotes diversity, inclusion, and gender equality. As a company specializing in digital transformation and artificial intelligence (IA), we recognize the importance of harnessing diverse perspectives to drive innovation and ensure the success of our business. This Gender Equality Policy outlines our commitment to creating an inclusive and equitable work environment.
            </Typography>
            <Typography variant="h6">2. Policy Statement</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Accsellium is dedicated to promoting gender equality in all aspects of our business operations, from recruitment and talent development to promotions and leadership opportunities. We strive to eliminate gender-based discrimination and biases, and we are committed to providing an inclusive workplace that values the contributions of all employees, regardless of gender identity or expression.
            </Typography>
            <Typography variant="h6">3. Recruitment and Hiring</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              We will ensure that our recruitment processes are fair and unbiased, actively seeking diverse candidates for all positions within the company. Job descriptions and qualifications will be written in a gender-neutral language to encourage a diverse pool of applicants. Interview panels will be diverse to minimize unconscious biases.
            </Typography>
            <Typography variant="h6">4. Equal Pay</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Accsellium is committed to ensuring equal pay for equal work. Salary structures will be regularly reviewed to identify and address any gender-based pay gaps. Transparent communication about compensation and benefits will be maintained to ensure employees are aware of the company's commitment to pay equity.
            </Typography>
            <Typography variant="h6">5. Training and Development</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              We will provide training programs to raise awareness of gender bias and promote inclusivity among employees. Professional development opportunities will be accessible to all employees, irrespective of gender, to ensure a level playing field for career advancement.
            </Typography>
            <Typography variant="h6">6. Work-Life Balance</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Accsellium supports flexible work arrangements to accommodate diverse needs and responsibilities outside of the workplace, promoting a healthy work-life balance. We will encourage an organizational culture that values and respects the personal lives and choices of all employees.
            </Typography>
            <Typography variant="h6">7. Preventing Harassment and Discrimination</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Accsellium has a zero-tolerance policy for any form of harassment or discrimination based on gender identity, expression, or any other protected characteristic. Reporting mechanisms will be in place to allow employees to confidentially report incidents, and appropriate action will be taken to address and prevent recurrence.
            </Typography>
            <Typography variant="h6">8. Leadership Commitment</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Leadership at Accsellium is committed to modeling inclusive behavior and fostering an environment where everyone feels valued and respected. Diversity and inclusion goals will be incorporated into leadership performance evaluations.
            </Typography>
            <Typography variant="h6">9. Regular Review and Improvement</Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              This policy will be regularly reviewed and updated to ensure its effectiveness in promoting gender equality. Accsellium will actively seek feedback from employees and stakeholders to identify areas for improvement.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              By implementing and continuously improving this Gender Equality Policy, Accsellium aims to create a workplace that celebrates diversity, promotes inclusion, and fosters gender equality in all aspects of our business.
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