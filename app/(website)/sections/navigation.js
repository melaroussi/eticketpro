import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import PetsIcon from '@mui/icons-material/Pets';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';

export default function Section() {
  const router = useRouter();

  const scrollTo = function(sectionId) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  }

  const loadLoginPage = function(event) {
    event.preventDefault();
    router.push("/application/");
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderBottom: "1px solid rgba(6, 95, 70, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.01)",
      }}
    >
      <Container maxWidth="lg" disableGutters> 
        <Toolbar sx={{ px: { xs: 2, md: 0 }, height: 72 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Stack 
              direction={"row"} 
              justifyContent={"start"} 
              alignItems={"center"} 
              onClick={() => scrollTo("home-section")}
              sx={{ cursor: 'pointer' }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5, width: 42, height: 42 }} >
                <PetsIcon />
              </Avatar>
              <Box>
                <Typography variant='h6' sx={{ ml: 0, fontWeight: 800, color: 'primary.main', letterSpacing: -0.5, lineHeight: 1.1 }}>
                  Zoo de Rabat
                </Typography>
                <Typography variant='caption' sx={{ ml: 0, fontWeight: 500, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  E-Ticket Pro
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
            <Button onClick={()=>scrollTo("home-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Accueil
            </Button>
            <Button onClick={()=>scrollTo("pricing-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Tarifs
            </Button>
            <Button onClick={()=>scrollTo("biozones-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Biozones
            </Button>
            <Button onClick={()=>scrollTo("subscribe-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Réserver
            </Button>
            <Button onClick={()=>scrollTo("contact-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Contact
            </Button>
            <Button onClick={()=>scrollTo("somayar-section")} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: 'primary.main' } }}>
              Partenaire
            </Button>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              onClick={(e)=>loadLoginPage(e)} 
              sx={{ 
                borderRadius: '10px', 
                px: 3.5, 
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              Connexion
            </Button>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  );
}