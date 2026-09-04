import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ConstructionIcon from '@mui/icons-material/Construction';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Section() {
  return (
    <Box 
      component={"section"} 
      id="somayar-section" 
      sx={{ 
        py: 10,
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(15, 23, 42, 0.05)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden', 
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format"
                alt="Technology Partner"
                loading="lazy"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
                
          <Grid item xs={12} md={7} >
            <Stack direction={'column'} spacing={3}>
              <Stack direction={'column'} spacing={1}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    fontWeight: 800, 
                    color: 'secondary.main', 
                    letterSpacing: 2, 
                    display: 'block' 
                  }}
                >
                  Partenaire Technologique Officiel
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark' }}>
                  Propulsé par SOMAYAR
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                  Depuis sa création en 1999, la société SOMAYAR a su s’octroyer une place de leader au Maroc dans les domaines de l’installation, de la maintenance, de la distribution, et des études techniques des systèmes de sécurité et de contrôle d’accès. 
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  En collaboration avec le Musée National des Arts & Civilisations, SOMAYAR déploie la solution <strong>e-Ticket Pro</strong> pour garantir un système de billetterie fluide, sécurisé et performant pour tous les visiteurs et passionnés d'art.
                </Typography>
              </Stack>
              
              <Grid container spacing={3} sx={{ pt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'rgba(6, 95, 70, 0.08)', color: 'primary.main' }}>
                      <ShieldIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 850 }}>Sécurité</Typography>
                      <Typography variant="caption" color="text.secondary">Contrôle d'accès certifié</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'rgba(6, 95, 70, 0.08)', color: 'primary.main' }}>
                      <SpeedIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 850 }}>Rapidité</Typography>
                      <Typography variant="caption" color="text.secondary">Validation instantanée</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'rgba(6, 95, 70, 0.08)', color: 'primary.main' }}>
                      <ConstructionIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 850 }}>Support 24/7</Typography>
                      <Typography variant="caption" color="text.secondary">Garantie de service</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Stack direction={'column'} spacing={1} sx={{ pt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Nos expertises clés :
                </Typography>
                <Stack direction={'row'} useFlexGap flexWrap="wrap" spacing={1}>
                  <Chip label="Billetterie Digitale" color="primary" variant="outlined" size="small"/>
                  <Chip label="Contrôle d'Accès Routier & Piéton" color="primary" variant="outlined" size="small"/>
                  <Chip label="Géolocalisation & Sécurité" color="primary" variant="outlined" size="small"/>
                  <Chip label="Data Center & Réseaux" color="primary" variant="outlined" size="small"/>
                </Stack>
              </Stack>
            </Stack> 
          </Grid>
        </Grid>
      </Container> 
    </Box>
  )
}
