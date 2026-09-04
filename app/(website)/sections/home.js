import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PetsIcon from '@mui/icons-material/Pets';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Chip from '@mui/material/Chip';

export default function Section() {
  // Booking simulator states
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [safari, setSafari] = React.useState(false);
  const [visitDate, setVisitDate] = React.useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Calculate pricing for Museum
  const priceAdult = 70; // Plein Tarif
  const priceChild = 40; // Tarif Réduit (Étudiant/Jeune)
  const priceSafari = 35; // Option Exposition Temporaire & Audioguide
  const total = (adults * priceAdult) + (children * priceChild) + (safari ? (adults + children) * priceSafari : 0);

  const incrementAdults = () => setAdults(prev => prev + 1);
  const decrementAdults = () => setAdults(prev => (prev > 1 ? prev - 1 : 1));
  const incrementChildren = () => setChildren(prev => prev + 1);
  const decrementChildren = () => setChildren(prev => (prev > 0 ? prev - 1 : 0));

  const handleBooking = () => {
    const pendingBooking = {
      adults,
      children,
      safari,
      date: visitDate,
      total
    };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("pending_booking", JSON.stringify(pendingBooking));
      // Dispatch a custom event so other components know the booking updated
      window.dispatchEvent(new CustomEvent("booking_updated"));
    }
    const element = document.getElementById("subscribe-section");
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  };

  const scrollTo = function(sectionId) {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  }

  // Live museum hours check (9h30 - 19h00)
  const [isOpen, setIsOpen] = React.useState(true);
  React.useEffect(() => {
    const hours = new Date().getHours();
    setIsOpen(hours >= 9 && hours < 19);
  }, []);

  React.useEffect(() => {
    const handleFormula = () => {
      const data = sessionStorage.getItem("formula_select");
      if (data) {
        const { adults: a, children: c, safari: s } = JSON.parse(data);
        setAdults(a);
        setChildren(c);
        setSafari(s);
      }
    };
    window.addEventListener("formula_selected", handleFormula);
    return () => window.removeEventListener("formula_selected", handleFormula);
  }, []);

  return (
    <Box 
      component={"section"} 
      id="home-section" 
      sx={{
        position: "relative",
        backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.90) 0%, rgba(2, 6, 23, 0.95) 100%), url('/images/museum_hero_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        pt: { xs: 16, md: 20 },
        pb: { xs: 10, md: 14 },
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <Box sx={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "50vw",
        height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">  
          <Grid item xs={12} md={7}>
            <Stack direction={"column"} spacing={4}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Chip 
                  label="Musée National des Arts & Civilisations" 
                  color="secondary"
                  variant="filled"
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '0.85rem', 
                    letterSpacing: 0.5,
                    px: 1,
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                  }} 
                />
              </Box>
              <Typography 
                component="h1" 
                variant="h2" 
                align="left" 
                sx={{ 
                  fontWeight: 900, 
                  lineHeight: 1.15,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.75rem' },
                  textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                }}
              >
                Voyagez à Travers les Siècles et les Chefs-d'Œuvre
              </Typography>
              <Typography variant="h6" align="left" sx={{ fontWeight: 300, opacity: 0.9, lineHeight: 1.6, maxWidth: '600px' }}>
                Réservez vos billets officiels en ligne, bénéficiez d'un accès prioritaire coupe-file et explorez nos galeries permanentes, chefs-d'œuvre antiques et expositions temporaires.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="large" 
                  onClick={() => scrollTo("subscribe-section")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: 3, 
                    px: 4, 
                    py: 1.8,
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  Réserver mes billets
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  size="large" 
                  onClick={() => scrollTo("biozones-section")}
                  sx={{ 
                    borderRadius: 3, 
                    px: 4, 
                    py: 1.8,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  Découvrir les Galeries
                </Button>
              </Stack>

              {/* Museum Information Widget */}
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.06)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4, 
                  p: 3,
                  border: '1px solid rgba(255,255,255,0.1)',
                  mt: 2
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <AccessTimeIcon sx={{ color: 'secondary.light', fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>Horaires de Visite</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>09h30 - 19h00</Typography>
                        <Typography variant="caption" sx={{ color: isOpen ? '#4ade80' : '#f87171', fontWeight: 700 }}>
                          {isOpen ? '● Ouvert au Public' : '● Fermé'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <WbSunnyIcon sx={{ color: 'secondary.light', fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>Conservation</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>21°C Température</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>Salles climatisées</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <HelpOutlineIcon sx={{ color: 'secondary.light', fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>Visite Guidée</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Départ 11h & 15h</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>Guides conférenciers</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={5}>
            {/* Booking Simulator Widget */}
            <Card 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.96)', 
                color: 'text.primary',
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                border: 'none',
                overflow: 'visible',
                position: 'relative'
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: -12,
                left: 20,
                backgroundColor: 'secondary.main',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                px: 2,
                py: 0.6,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)'
              }}>
                Billetterie Officielle
              </Box>
              <CardContent sx={{ p: 4, pt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Simulateur de Billet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Calculez votre tarif et réservez instantanément en ligne.
                </Typography>

                <Stack spacing={3}>
                  <TextField
                    label="Date de visite au musée"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />

                  {/* Adults Counter */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>Plein Tarif (Adulte)</Typography>
                      <Typography variant="caption" color="text.secondary">70 MAD (Collections permanentes)</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton onClick={decrementAdults} size="small" sx={{ border: '1px solid #cbd5e1' }} color="primary">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ fontWeight: 800, minWidth: 24, textAlign: 'center' }}>{adults}</Typography>
                      <IconButton onClick={incrementAdults} size="small" sx={{ border: '1px solid #cbd5e1' }} color="primary">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Children / Reduced Counter */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>Tarif Réduit (Jeunes / Étudiants)</Typography>
                      <Typography variant="caption" color="text.secondary">40 MAD (Gratuit moins de 10 ans)</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton onClick={decrementChildren} size="small" sx={{ border: '1px solid #cbd5e1' }} color="primary">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ fontWeight: 800, minWidth: 24, textAlign: 'center' }}>{children}</Typography>
                      <IconButton onClick={incrementChildren} size="small" sx={{ border: '1px solid #cbd5e1' }} color="primary">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Exhibition + Audioguide Add-on */}
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={safari} 
                          onChange={(e) => setSafari(e.target.checked)} 
                          color="secondary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.dark' }}>Option Expo Temporaire + Audioguide (+35 MAD/pers)</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Accès à la grande exposition du moment et audioguide interactif multilingue.
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  {/* Price Breakdown */}
                  <Box sx={{ borderTop: '1px dashed #cbd5e1', pt: 2, mt: 1 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Entrée Collections Permanentes</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{adults * priceAdult + children * priceChild} MAD</Typography>
                    </Stack>
                    {safari && (
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Option Expo & Audioguide</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{(adults + children) * priceSafari} MAD</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mt: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>Total Estimé</Typography>
                      <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 900 }}>{total} MAD</Typography>
                    </Stack>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    onClick={handleBooking}
                    sx={{ 
                      mt: 1, 
                      py: 1.5, 
                      borderRadius: 3, 
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: 'primary.light'
                      }
                    }}
                  >
                    Réserver & Acheter maintenant
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container> 
    </Box>
  )
}
