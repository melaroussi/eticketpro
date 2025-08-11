import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import { green, grey, pink, blue } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { YouTube } from '@mui/icons-material';


export default function Footer() {
  return (
    <Box component={"section"} id="footer-section" sx={{ py: 4, backgroundColor: grey[900], color: grey[50] }}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item sm={12} md={12}>

            <Stack direction={'column'} spacing={2}>
              
              <Stack direction={'column'} spacing={-1}>
                <Typography variant="h6" align="center" gutterBottom>
                  eTicket Pro v1.0 by Somayar SARL
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Votre Solution de Bielleterie Digitale
                </Typography>
              </Stack>

              <Stack direction={'row'} spacing={1} justifyContent={"center"}>
                <Link href="https://web.facebook.com/SomayarSarl?_rdc=1&_rdr" target="_blank" underline="none" variant='body2'>
                  <Avatar sx={{backgroundColor: grey[100], color: grey[800]}}>
                    <FacebookIcon/>
                  </Avatar>
                </Link>
                <Link href="https://www.youtube.com/c/SomayarSarl"  target="_blank" underline="none" variant='body2'>
                  <Avatar sx={{backgroundColor: grey[100], color: grey[800]}}>
                    <YouTube/>
                  </Avatar>
                </Link>
                <Link href="https://fr.linkedin.com/company/somayar"  target="_blank" underline="none" variant='body2'>
                  <Avatar sx={{backgroundColor: grey[100], color: grey[800]}}>
                    <LinkedInIcon/>
                  </Avatar>
                </Link>
                <Link href="https://api.whatsapp.com/send/?phone=%2B212661541941&text&type=phone_number&app_absent=0"  target="_blank" underline="none" variant='body2'>
                  <Avatar sx={{backgroundColor: grey[100], color: grey[800]}}>
                    <WhatsAppIcon/>
                  </Avatar>
                </Link>
              </Stack>
              
              <Typography variant="body2" align="center" >
                Copyright 2024 Somayar
              </Typography>

            </Stack>
          
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}