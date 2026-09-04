"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AlertTitle, Grid, Stack, Switch, FormControlLabel } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SaveIcon from "@mui/icons-material/Save";
import { blue } from "@mui/material/colors";
import { useRouter } from 'next/navigation';
import NavigationSystem from "../components/NavigationSystem";

const DRAWER_WIDTH = 250;

export default function SmtpSettings() {
  const router = useRouter();

  // State handlers
  const [host, setHost] = React.useState("");
  const [port, setPort] = React.useState("587");
  const [secure, setSecure] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fromEmail, setFromEmail] = React.useState("");

  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [validationAlert, setValidationAlert] = React.useState(false);

  // Protection de route et chargement des données
  React.useEffect(() => {
    const loggedUser = sessionStorage.getItem("user");
    if (!loggedUser) {
      router.replace("/application");
      return;
    }

    // Charger les configurations existantes
    fetch("/api/smtp-config")
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          const config = data.result;
          setHost(config.host || "");
          setPort(String(config.port || "587"));
          setSecure(config.secure === 1);
          setUser(config.user || "");
          setPassword(config.password || "");
          setFromEmail(config.fromEmail || "");
        }
      })
      .catch(err => {
        console.error("Failed to load SMTP settings:", err);
        setErrorMessage("Impossible de charger la configuration SMTP.");
        setErrorAlert(true);
      });
  }, [router]);

  const saveSettings = async (event) => {
    event.preventDefault();
    if (!host || !port || !fromEmail) {
      setValidationAlert(true);
      return;
    }

    try {
      const response = await fetch("/api/smtp-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host,
          port: parseInt(port),
          secure,
          user,
          password,
          fromEmail
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 5000);
      } else {
        setErrorMessage(data.error || "Une erreur est survenue.");
        setErrorAlert(true);
      }
    } catch (error) {
      console.error("Save failed:", error);
      setErrorMessage("Une erreur réseau est survenue.");
      setErrorAlert(true);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"smtp"} element={"Configuration SMTP"} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardHeader 
                  avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><MailOutlineIcon /></Avatar>} 
                  title="Configuration du Serveur Messagerie (SMTP)" 
                  subheader="Paramètres d'envoi automatique des emails de confirmation et de tickets" 
                />
                <CardContent>
                  <Stack spacing={3}>
                    {/* Alerts */}
                    <Collapse in={validationAlert}>
                      <Alert severity="warning" action={<IconButton color="inherit" size="small" onClick={() => setValidationAlert(false)}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }} >
                        <AlertTitle>Champs requis</AlertTitle>
                        Veuillez remplir les champs obligatoires (*).
                      </Alert>
                    </Collapse>

                    <Collapse in={successAlert}>
                      <Alert severity="success" action={<IconButton color="inherit" size="small" onClick={() => setSuccessAlert(false)}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }} >
                        <AlertTitle>Succès</AlertTitle>
                        Configuration SMTP sauvegardée avec succès !
                      </Alert>
                    </Collapse>

                    <Collapse in={errorAlert}>
                      <Alert severity="error" action={<IconButton color="inherit" size="small" onClick={() => setErrorAlert(false)}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }} >
                        <AlertTitle>Erreur</AlertTitle>
                        {errorMessage}
                      </Alert>
                    </Collapse>

                    {/* Server Settings */}
                    <Typography variant="h6" sx={{ fontWeight: 600, borderBottom: '1px solid #eee', pb: 1 }}>
                      Paramètres du serveur
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <TextField 
                          value={host} 
                          onChange={(e) => setHost(e.target.value)} 
                          variant="outlined" 
                          size="small" 
                          label="Serveur Hôte SMTP" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                          placeholder="smtp.example.com"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField 
                          value={port} 
                          onChange={(e) => setPort(e.target.value)} 
                          variant="outlined" 
                          size="small" 
                          label="Port SMTP" 
                          required 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                          placeholder="587"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch 
                              checked={secure} 
                              onChange={(e) => setSecure(e.target.checked)} 
                              color="primary"
                            />
                          }
                          label="Utiliser SSL / Connexion Sécurisée (Recommandé pour port 465)"
                        />
                      </Grid>
                    </Grid>

                    {/* Authentication Settings */}
                    <Typography variant="h6" sx={{ fontWeight: 600, borderBottom: '1px solid #eee', pb: 1 }}>
                      Authentification & Expéditeur
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={user} 
                          onChange={(e) => setUser(e.target.value)} 
                          variant="outlined" 
                          size="small" 
                          label="Nom d'utilisateur (User)" 
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          variant="outlined" 
                          size="small" 
                          label="Mot de passe SMTP" 
                          type="password"
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          value={fromEmail} 
                          onChange={(e) => setFromEmail(e.target.value)} 
                          variant="outlined" 
                          size="small" 
                          label="Adresse email de l'expéditeur (From)" 
                          required
                          fullWidth 
                          InputLabelProps={{ shrink: true }}
                          placeholder="noreply@musee-civilisations.ma"
                        />
                      </Grid>
                    </Grid>

                    {/* Save Button */}
                    <Stack direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>
                      <Button 
                        onClick={saveSettings} 
                        size="medium" 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                        sx={{ borderRadius: 2, px: 4, textTransform: 'none', fontWeight: 600 }}
                      >
                        Sauvegarder la configuration
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
