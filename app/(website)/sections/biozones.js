import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const zones = [
  {
    title: 'Antiquités & Archéologie',
    description: 'Une traversée des civilisations antiques méditerranéennes : mosaïques préservées, marbres impériaux, poteries néolithiques et stèles sculptées.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format',
    animals: ['Mosaïques Romaines', 'Statues Impériales', 'Monnaies d\'Or Antiques', 'Stèles Funéraires'],
    color: '#b45309',
  },
  {
    title: 'Arts de l\'Islam & Civilisations',
    description: 'Une immersion dans le raffinement artistique arabo-andalou : manuscrits enluminés rares, céramiques lustrées, zelliges et astrolabes médiévaux.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&auto=format',
    animals: ['Manuscrits Enluminés', 'Zelliges & Boiseries', 'Astrolabes Médiévaux', 'Armures d\'Apparat'],
    color: '#0284c7',
  },
  {
    title: 'Grands Maîtres & Renaissance',
    description: 'Une collection d\'exception d\'huiles sur toile, retables magistraux et portraits historiques célébrant l\'âge d\'or de la peinture classique.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format',
    animals: ['Peintures à l\'huile', 'Portraits Royaux', 'Gravures Historiques', 'Sculptures de Bronze'],
    color: '#991b1b',
  },
  {
    title: 'Art Moderne & Contemporain',
    description: 'Un dialogue vibrant entre avant-gardes artistiques, toiles expressionnistes, photographies documentaires et sculptures contemporaines.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format',
    animals: ['Toiles Abstraites', 'Installations Visuelles', 'Photographies d\'Art', 'Sculptures Épurées'],
    color: '#6366f1',
  },
  {
    title: 'Galerie des Trésors & Expositions',
    description: 'Un espace feutré et sécurisé abritant les parures impériales, orfèvreries d\'exception et les grandes expositions temporaires internationales.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&auto=format',
    animals: ['Parures Impériales', 'Orfèvrerie Rare', 'Prêts Internationaux', 'Cabinet de Curiosités'],
    color: '#d97706',
  },
];

export default function Biozones() {
  const [activeZone, setActiveZone] = React.useState(null);

  return (
    <Box 
      component="section" 
      id="biozones-section" 
      sx={{ 
        py: 10, 
        backgroundColor: 'rgba(15, 23, 42, 0.02)',
        position: 'relative' 
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              color: 'primary.dark',
              mb: 2 
            }}
          >
            Explorez nos Galeries & Collections
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ fontWeight: 400, maxWidth: '700px', mx: 'auto' }}
          >
            Le Musée National des Arts & Civilisations rassemble des millénaires d'art et d'histoire. Cliquez sur une galerie pour en découvrir les chefs-d'œuvre majeurs.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {zones.map((zone, index) => {
            const isSelected = activeZone === index;
            return (
              <Grid item key={zone.title} xs={12} sm={6} md={4}>
                <Card 
                  onClick={() => setActiveZone(isSelected ? null : index)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    transform: isSelected ? 'scale(1.02)' : 'none',
                    borderColor: isSelected ? 'secondary.main' : 'rgba(229, 231, 235, 0.6)',
                    borderWidth: isSelected ? 2 : 1,
                    boxShadow: isSelected 
                      ? '0 20px 25px -5px rgba(217, 119, 6, 0.15), 0 10px 10px -5px rgba(217, 119, 6, 0.04)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: isSelected ? 'scale(1.02)' : 'translateY(-6px)',
                      boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 210 }}>
                    <CardMedia
                      component="img"
                      image={zone.image}
                      alt={zone.title}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.08)'
                        }
                      }}
                    />
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8
                      }}
                    >
                      <AccountBalanceIcon sx={{ fontSize: 16, color: 'secondary.light' }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Galerie d'Art
                      </Typography>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 800, 
                        mb: 1.5,
                        color: isSelected ? 'secondary.main' : 'text.primary'
                      }}
                    >
                      {zone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {zone.description}
                    </Typography>
                    
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                        Œuvres emblématiques :
                      </Typography>
                      <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
                        {zone.animals.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            size="small"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              backgroundColor: isSelected ? 'rgba(217, 119, 6, 0.1)' : 'rgba(15, 23, 42, 0.04)',
                              color: isSelected ? 'secondary.dark' : 'text.secondary',
                              border: isSelected ? '1px solid rgba(217, 119, 6, 0.3)' : 'none',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
