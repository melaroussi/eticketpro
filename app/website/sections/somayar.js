import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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

import Masonry from '@mui/lab/Masonry';

import Chip from '@mui/material/Chip';

import { green, red, blueGrey, grey, yellow, blue, pink, orange } from '@mui/material/colors';
import Image from 'next/image';

export default function Section() {
  return (
    <Box component={"section"} id="somayar-section" sx={{height: "100%"}}>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          
          <Grid item sm={12} md={4}>
            <Masonry columns={2} spacing={1} >
              {
                itemData.map((item, index) => (
                  <div key={index}>
                    <img
                      srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=162&auto=format`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        borderRadius: 6,
                        display: 'block',
                        width: '100%',
                      }}
                    />
                  </div>
                ))
              }
            </Masonry>
          </Grid>
                
          <Grid item sm={12} md={8} >
            <Stack direction={'column'} spacing={2}>
              <Stack direction={'column'} spacing={1}>
                <Typography component="h1" variant="h4">
                  Nous sommes SOMAYAR
                </Typography>
                <Typography variant="body2" component={"p"} paragraph>
                  Depuis sa création en 1999 la société SOMAYAR a pu s’octroyer une place à part, parmi les plus grandes sociétés du Maroc, spécialisées dans les domaines d’installation, de la maintenance, de la distribution, et des études techniques des systèmes de sécurité.
                </Typography>
              </Stack>
              <Stack direction={'column'} spacing={-0.5}>
                <Typography variant="h6" paragraph>
                  Nous faisons principalement les activités ci-dessous :
                </Typography>
                <Stack direction={'row'}>
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Billeterie" size="medium"/>
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Control d'Accès" size="medium" />
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Geolocalisation" size="medium" />
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Data Center" size="medium" />
                </Stack>
              </Stack>
              <Stack direction={'column'} spacing={-0.5}>
                <Typography variant="h6" paragraph>
                  Nos valeurs fondamentales :
                </Typography>
                <Stack direction={'row'} spacing={0}>
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: orange[400] }} label="Qualité de Service" size="medium"/>
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: yellow[500] }} label="Support Technique" size="medium" />
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: green[400] }} label="Compétence et RH Qualifiées" size="medium" />
                  <Chip sx={{ mt: 1, mr: 1, backgroundColor: green[900] }} label="Certification ISO" size="medium" />     
                </Stack>
              </Stack>
            </Stack> 
          </Grid>

        </Grid>
      </Container> 
    </Box>
  )
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  }
];
