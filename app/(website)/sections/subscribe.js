import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';

export default function Section() {
  const router = useRouter();

  // Validation alert state
  const [validationAlert, setValidationAlert] = React.useState(false);

  // Form states
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState("Actif");
  const [departmentId, setDepartmentId] = React.useState(null);
  const [profile, setProfile] = React.useState("visitor");
  const [businessName, setBusinessName] = React.useState("");
  const [type, setType] = React.useState("Client Web");

  // Pending booking details state
  const [pendingBooking, setPendingBooking] = React.useState(null);

  const loadPendingBooking = () => {
    if (typeof window !== 'undefined') {
      const data = sessionStorage.getItem("pending_booking");
      if (data) {
        setPendingBooking(JSON.parse(data));
      }
    }
  };

  React.useEffect(() => {
    loadPendingBooking();

    // Listen to custom booking update events
    const handleBookingUpdate = () => {
      loadPendingBooking();
    };

    window.addEventListener("booking_updated", handleBookingUpdate);
    window.addEventListener("formula_selected", handleBookingUpdate);
    return () => {
      window.removeEventListener("booking_updated", handleBookingUpdate);
      window.removeEventListener("formula_selected", handleBookingUpdate);
    };
  }, []);

  const save = async function(event) {
    event.preventDefault();

    if (!firstName || !lastName || !email || !phone || !password || !gender) {
      setValidationAlert(true);
    } else {
      const OPTIONS = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          gender,
          status,
          departmentId,
          profile,
          businessName,
          type,
          phone,
        }),
      };
      
      try {
        const response = await fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=create"), OPTIONS);
        if (response.ok) {
          // Redirect to log in page to finalize purchase
          router.replace('/application');
        }
      } catch (err) {
        console.error("Error creating user:", err);
      }
    }
  };

  return (
    <Box 
      component="section" 
      id="subscribe-section" 
      sx={{ 
        py: 10,
        backgroundColor: '#f8fafc',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={3}>
              <Typography 
                component="h2" 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'primary.dark',
                  lineHeight: 1.2
                }}
              >
                Inscrivez-vous & Validez votre Achat
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Créez votre compte visiteur gratuit en quelques secondes pour valider votre réservation de billets électroniques. Une fois votre compte créé, connectez-vous pour obtenir vos QR Codes d'accès direct au zoo.
              </Typography>

              <Stack spacing={2} sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Accès immédiat coupe-file via codes QR mobiles.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Historique et téléchargement des factures et billets PDF.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Support client prioritaire et gestion des dates de visite.
                  </Typography>
                </Stack>
              </Stack>
              
              <Box sx={{ mt: 2 }}>
                <Chip sx={{ mr: 1, mb: 1, px: 1, backgroundColor: 'primary.light', color: 'primary.dark', fontWeight: 600 }} label="Achat Sécurisé SSL" />
                <Chip sx={{ mr: 1, mb: 1, px: 1, backgroundColor: 'secondary.light', color: 'secondary.dark', fontWeight: 600 }} label="E-Billets Immédiats" />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Interactive Booking Summary Card */}
              {pendingBooking && (
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(6, 95, 70, 0.04)',
                    borderColor: 'primary.main',
                    borderWidth: '1.5px',
                    borderStyle: 'dashed',
                    boxShadow: 'none',
                    borderRadius: 3
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <LocalActivityIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.dark' }}>
                        Récapitulatif de votre Sélection
                      </Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Date de visite</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{pendingBooking.date}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Formule choisie</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {pendingBooking.adults} Adulte(s) {pendingBooking.children > 0 && `, ${pendingBooking.children} Enfant(s)`}
                        </Typography>
                      </Grid>
                      {pendingBooking.safari && (
                        <Grid item xs={12}>
                          <Chip 
                            label="Option Safari incluse" 
                            color="secondary" 
                            size="small" 
                            sx={{ fontWeight: 600 }} 
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} sx={{ borderTop: '1px solid rgba(6, 95, 70, 0.1)', pt: 1.5, mt: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Total à payer :</Typography>
                          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 900 }}>
                            {pendingBooking.total} MAD
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              <Card sx={{ border: '1px solid rgba(15, 23, 42, 0.08)', boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)' }}>
                <CardHeader 
                  avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }} variant="rounded">
                      <AssignmentIndIcon />
                    </Avatar>
                  } 
                  title="Formulaire d'Inscription" 
                  subheader="Créez votre compte visiteur en remplissant les champs ci-dessous." 
                  titleTypographyProps={{ fontWeight: 800 }}
                  sx={{ borderBottom: '1px solid #f1f5f9' }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Collapse in={validationAlert}>
                      <Alert 
                        severity="error" 
                        action={
                          <IconButton color="inherit" size="small" onClick={() => setValidationAlert(false)}>
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        } 
                      >
                        <AlertTitle>Validation manquante</AlertTitle>
                        Veuillez remplir tous les champs obligatoires avant de vous inscrire.
                      </Alert>
                    </Collapse>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Prénom" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Nom" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Adresse Email" 
                          type="email"
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Numéro de Téléphone" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Mot de Passe" 
                          type="password" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={gender} 
                          onChange={(e) => setGender(e.target.value)} 
                          variant='outlined' 
                          size='small' 
                          label="Genre" 
                          required 
                          fullWidth
                          InputLabelProps={{ shrink: true }} 
                          select
                        >
                          <MenuItem value={"Male"}>Homme</MenuItem>
                          <MenuItem value={"Female"}>Femme</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>

                    <Button 
                      onClick={save} 
                      size="large" 
                      variant='contained' 
                      fullWidth
                      sx={{ 
                        py: 1.5, 
                        fontWeight: 700,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      Enregistrer et Continuer
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container> 
    </Box>
  );
}
