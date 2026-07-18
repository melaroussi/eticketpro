import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';

const tiers = [
  {
    title: 'Billet Enfant',
    id: 'child',
    price: '50',
    description: 'De 3 à 11 ans',
    features: [
      'Accès complet au Zoo',
      'Accès aux 5 biozones',
      'Accès libre aux aires de jeux',
      'Gratuit pour les moins de 3 ans',
    ],
    buttonText: 'Choisir ce tarif',
    buttonVariant: 'outlined',
  },
  {
    title: 'Billet Adulte',
    id: 'adult',
    price: '80',
    description: '12 ans et plus',
    features: [
      'Accès complet au Zoo',
      'Accès aux 5 biozones',
      'Accès aux expositions temporaires',
      'Option Safari disponible',
    ],
    buttonText: 'Choisir ce tarif',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pack Famille',
    id: 'family',
    subheader: 'Le plus populaire',
    price: '220',
    description: '2 Adultes + 2 Enfants',
    features: [
      '4 tickets d\'entrée au total',
      'Économisez 40 MAD',
      'Option Safari disponible',
      'Entrée prioritaire coupe-file',
    ],
    buttonText: 'Sélectionner le pack',
    buttonVariant: 'contained',
  },
  {
    title: 'Pass Annuel',
    id: 'annual',
    price: '350',
    description: 'Nominatif et individuel',
    features: [
      'Accès illimité pendant 365 jours',
      '-10% sur la boutique officielle',
      'Invitations aux événements club',
      'Coupe-file permanent',
    ],
    buttonText: 'S\'abonner en ligne',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  const handleChoose = (id) => {
    let formula = { adults: 1, children: 0, safari: false };
    if (id === 'child') {
      formula = { adults: 1, children: 1, safari: false };
    } else if (id === 'adult') {
      formula = { adults: 1, children: 0, safari: false };
    } else if (id === 'family') {
      formula = { adults: 2, children: 2, safari: false };
    } else if (id === 'annual') {
      formula = { adults: 1, children: 0, safari: true };
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem("formula_select", JSON.stringify(formula));
      window.dispatchEvent(new CustomEvent("formula_selected"));
    }

    const element = document.getElementById("home-section");
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Box 
      component="section" 
      id="pricing-section" 
      sx={{ 
        py: 10, 
        backgroundColor: '#ffffff',
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
            Nos Formules & Tarifs
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ fontWeight: 400, maxWidth: '600px', mx: 'auto' }}
          >
            Réservez en ligne pour bénéficier du coupe-file immédiat aux guichets d'entrée du zoo.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.id === 'family' ? 12 : 6}
              md={3}
            >
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderColor: tier.id === 'family' ? 'primary.main' : 'rgba(229, 231, 235, 0.6)',
                  borderWidth: tier.id === 'family' ? 2 : 1,
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04)'
                  }
                }}
              >
                {tier.subheader && (
                  <Box 
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      textAlign: 'center',
                      py: 0.75,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    {tier.subheader}
                  </Box>
                )}
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 1 }}>
                    {tier.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography component="span" variant="h3" sx={{ fontWeight: 900, color: 'primary.main' }}>
                      {tier.price}
                    </Typography>
                    <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>
                      MAD
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                    {tier.description}
                  </Typography>
                  <Stack spacing={1.5}>
                    {tier.features.map((feature) => (
                      <Stack key={feature} direction="row" spacing={1} alignItems="center">
                        <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color={tier.id === 'family' ? 'primary' : 'inherit'}
                    onClick={() => handleChoose(tier.id)}
                    sx={{
                      py: 1.2,
                      borderColor: '#cbd5e1',
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: tier.id === 'family' ? 'primary.dark' : 'rgba(6, 95, 70, 0.05)',
                        borderColor: 'primary.main',
                      }
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
