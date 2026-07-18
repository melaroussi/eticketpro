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
import NatureIcon from '@mui/icons-material/Nature';

const zones = [
  {
    title: 'Montagnes de l\'Atlas',
    description: 'Une reconstitution fidèle des falaises et reliefs rocheux marocains, abritant les espèces originaires des montagnes.',
    image: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7?w=600&auto=format',
    animals: ['Lion de l\'Atlas', 'Singe Magot', 'Mouflon à manchettes', 'Rapaces'],
    color: '#3b82f6',
  },
  {
    title: 'La Savane Africaine',
    description: 'De grandes plaines herbeuses où cohabitent les herbivores spectaculaires et les prédateurs les plus rapides de la planète.',
    image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&auto=format',
    animals: ['Girafes', 'Éléphants', 'Guépards', 'Lions', 'Zèbres'],
    color: '#d97706',
  },
  {
    title: 'Désert du Sahara',
    description: 'Une zone aride pour observer les extraordinaires capacités d\'adaptation des animaux sahariens à la chaleur extrême.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format',
    animals: ['Addax', 'Oryx Algazelle', 'Gazelles Dorcas', 'Autruches'],
    color: '#f59e0b',
  },
  {
    title: 'Les Zones Humides',
    description: 'Un point d\'eau dynamique imitant les marécages et deltas d\'Afrique, indispensable à de nombreuses espèces aquatiques.',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format',
    animals: ['Hippopotames', 'Crocodiles du Nil', 'Flamants Roses', 'Ibis'],
    color: '#06b6d4',
  },
  {
    title: 'Forêt Tropicale',
    description: 'Un environnement chaud et humide, caractérisé par une végétation dense et le cri strident des primates et oiseaux exotiques.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format',
    animals: ['Chimpanzés', 'Mandrills', 'Oiseaux Exotiques', 'Pythons'],
    color: '#10b981',
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
        backgroundColor: 'rgba(6, 95, 70, 0.02)',
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
            Explorez nos 5 Biozones
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ fontWeight: 400, maxWidth: '700px', mx: 'auto' }}
          >
            Le Jardin Zoologique National de Rabat reproduit fidèlement les écosystèmes d'Afrique. Cliquez sur une biozone pour en découvrir les habitants.
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
                    borderColor: isSelected ? 'primary.main' : 'rgba(229, 231, 235, 0.6)',
                    borderWidth: isSelected ? 2 : 1,
                    boxShadow: isSelected 
                      ? '0 20px 25px -5px rgba(6, 95, 70, 0.1), 0 10px 10px -5px rgba(6, 95, 70, 0.04)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: isSelected ? 'scale(1.02)' : 'translateY(-6px)',
                      boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.06)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <CardMedia
                      component="img"
                      image={zone.image}
                      alt={zone.title}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <NatureIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Biozone
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
                        color: isSelected ? 'primary.main' : 'text.primary'
                      }}
                    >
                      {zone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {zone.description}
                    </Typography>
                    
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                        Espèces emblématiques :
                      </Typography>
                      <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
                        {zone.animals.map((animal) => (
                          <Chip
                            key={animal}
                            label={animal}
                            size="small"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              backgroundColor: isSelected ? 'rgba(6, 95, 70, 0.08)' : 'rgba(15, 23, 42, 0.04)',
                              color: isSelected ? 'primary.dark' : 'text.secondary',
                              border: isSelected ? '1px solid rgba(6, 95, 70, 0.2)' : 'none',
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
