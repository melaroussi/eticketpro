import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Contact() {
  const [emailAdress, setEmailAdress] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [contactReason, setContactReason] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const send = function(event) {
    event.preventDefault();
    if (emailAdress && fullName && contactReason && message) {
      setSent(true);
      // Mock sending message
      setTimeout(() => {
        setSent(false);
        setEmailAdress("");
        setFullName("");
        setContactReason("");
        setMessage("");
      }, 3000);
    }
  };

  const reasons = [
    { key: "R01", value: "Groupes & Sorties Scolaires", label: "Visites Groupes / Scolaires" },
    { key: "R02", value: "Événementiel & Séminaires", label: "Séminaires / Anniversaires" },
    { key: "R03", value: "Support Billetterie en ligne", label: "Aide / Problème e-Ticket" },
    { key: "R04", value: "Informations Générales", label: "Questions Diverses" },
  ];

  return (
    <Box 
      component={"section"} 
      id="contact-section" 
      sx={{ 
        py: 10,
        backgroundColor: 'rgba(6, 95, 70, 0.02)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Stack direction="column" spacing={3}>
              <Box>
                <Typography variant="overline" sx={{ fontWeight: 800, color: 'secondary.main', letterSpacing: 1.5 }}>
                  Des questions ?
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark', mt: 1 }}>
                  Contactez le Zoo
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Que ce soit pour organiser une sortie scolaire, planifier un anniversaire, ou pour toute question relative à l'achat de vos billets électroniques, nos équipes sont à votre entière disposition.
              </Typography>

              <Stack spacing={3} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', color: '#ffffff' }}>
                    <LocationOnIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Adresse</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jardin Zoologique de Rabat, Annakhil, Rabat, Maroc
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', color: '#ffffff' }}>
                    <PhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Téléphone</Typography>
                    <Typography variant="body2" color="text.secondary">+212 537 70 00 00</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', color: '#ffffff' }}>
                    <MailIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Email</Typography>
                    <Typography variant="body2" color="text.secondary">contact@rabatzoo.ma</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid rgba(15, 23, 42, 0.08)', boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)' }}>
              <CardContent sx={{ p: 4 }}>
                {sent ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                      <CheckCircleIcon sx={{ fontSize: 36, color: '#ffffff' }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Message Envoyé !</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Merci pour votre message. Notre équipe reviendra vers vous très prochainement.
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={3}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Envoyez-nous un message
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          label="Nom Complet"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={emailAdress}
                          onChange={(e) => setEmailAdress(e.target.value)}
                          label="Adresse Email"
                          variant="outlined"
                          size="small"
                          type="email"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          value={contactReason}
                          onChange={(e) => setContactReason(e.target.value)}
                          label="Sujet de votre demande"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          select
                        >
                          {reasons.map((option) => (
                            <MenuItem key={option.key} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          label="Votre message"
                          variant="outlined"
                          size="small"
                          multiline
                          rows={4}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                    <Button 
                      onClick={send}
                      variant="contained"
                      size="large"
                      sx={{ 
                        py: 1.5, 
                        fontWeight: 700,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      Envoyer le message
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container> 
    </Box>
  );
}