import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Avatar from '@mui/material/Avatar';

export default function Footer() {
  const scrollTo = function(sectionId) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  }

  return (
    <Box 
      component={"footer"} 
      id="footer-section" 
      sx={{ 
        py: 8, 
        backgroundColor: '#0f172a', // Midnight Navy
        color: '#ffffff',
        borderTop: '4px solid',
        borderColor: 'secondary.main',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                Musée des Civilisations
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                Le Musée National des Arts & Civilisations préserve des millénaires d'histoire, de chefs-d'œuvre picturaux et de trésors archéologiques. Un lieu d'émerveillement et de culture ouvert à tous les publics.
              </Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'secondary.light' }}>
              Plan du Musée
            </Typography>
            <Stack spacing={1}>
              <Link onClick={() => scrollTo("home-section")} sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', cursor: 'pointer', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Accueil
              </Link>
              <Link onClick={() => scrollTo("pricing-section")} sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', cursor: 'pointer', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Tarifs & Billetterie
              </Link>
              <Link onClick={() => scrollTo("biozones-section")} sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', cursor: 'pointer', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Galeries & Collections
              </Link>
              <Link onClick={() => scrollTo("subscribe-section")} sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', cursor: 'pointer', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Réservation E-Ticket
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'secondary.light' }}>
              Ressources
            </Typography>
            <Stack spacing={1}>
              <Link href="/application" sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Espace Client
              </Link>
              <Link href="/website/pages/privacy-policy" sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Confidentialité
              </Link>
              <Link href="/website/pages/terms-of-service" sx={{ color: '#ffffff', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, color: 'secondary.light' } }}>
                Conditions
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'secondary.light' }}>
              Suivez-nous
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link href="https://web.facebook.com/SomayarSarl" target="_blank" underline="none">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#ffffff', '&:hover': { bgcolor: 'secondary.main' } }}>
                  <FacebookIcon />
                </Avatar>
              </Link>
              <Link href="https://www.youtube.com/c/SomayarSarl" target="_blank" underline="none">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#ffffff', '&:hover': { bgcolor: 'secondary.main' } }}>
                  <YouTubeIcon />
                </Avatar>
              </Link>
              <Link href="https://fr.linkedin.com/company/somayar" target="_blank" underline="none">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#ffffff', '&:hover': { bgcolor: 'secondary.main' } }}>
                  <LinkedInIcon />
                </Avatar>
              </Link>
              <Link href="https://api.whatsapp.com/send/?phone=%2B212661541941" target="_blank" underline="none">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#ffffff', '&:hover': { bgcolor: 'secondary.main' } }}>
                  <WhatsAppIcon />
                </Avatar>
              </Link>
            </Stack>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            eTicket Pro v1.0 by SOMAYAR. Tous droits réservés &copy; {new Date().getFullYear()}.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.4, display: 'block', mt: 1 }}>
            Jardin Zoologique National de Rabat - Partenariat Technologique SOMAYAR
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}