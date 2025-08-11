import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Masonry from '@mui/lab/Masonry';
import Image from 'next/image';

export default function Section() {

  let [pictures, setPictures] = React.useState();
  
  React.useEffect(function(){
    setPictures([
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
        img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
        title: 'Camping Car',
      }
    ])
  }, [])
  
  const scrollTo = function(sectionId) {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  }

  return (
    <Box component={"section"} id="home-section" sx={{height: "100%"}}>
      <Container sx={{ py: 20 }} maxWidth="md">
        <Grid container spacing={4}>  
          <Grid item sm={12} md={8}>
            <Stack direction={"column"}>
              <Typography component="h1" variant="h4" align="left" gutterBottom>
                Simplifiez l'achat de vos billets en ligne ! NODE_ENV { process.env.NODE_ENV },API_USER_ENDPOINT {process.env.API_USER_ENDPOINT}, db : { process.env.DB_DATABASE }, db user { process.env.DB_USER }, host { process.env.DB_HOST }, socket { process.env.DB_INSTANCE_SOCKET}
              </Typography>
              <Typography variant="h6" align="left" color="text.secondary" paragraph>
                Découvrez une nouvelle façon simple et innovante d'acheter vos billets en ligne ! Notre plateforme conviviale vous permet de parcourir, réserver et acheter des billets en quelques clics seulement. Fini les tracas, profitez pleinement de l'événement à venir !
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={12} md={4}>
            {
              pictures && <Masonry columns={2} spacing={1} >
                {
                  pictures.map((item, index) => (
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
            }
          </Grid>
        </Grid>
      </Container> 
    </Box>
  )
}
