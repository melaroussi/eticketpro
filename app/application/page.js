"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AlertTitle, Grid, Paper, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from "@mui/icons-material/Close";
import StyleIcon from "@mui/icons-material/Style";

/** Hooks */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)
  let [authentificationAlert, setAuthentificationAlert] = React.useState(false)
  
  /** Form data */
  let [email, setEmail] = React.useState("")
  let [password, setPassword] = React.useState("")
  
  /** State handlers */
  const handleEmail = function(event){
    setEmail(event.target.value)
  }

  const handlePassword = function(event){
    setPassword(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  const handleAuthentificationAlert = function(event){
    setAuthentificationAlert(false)
  }
  
  /** Save button action */
  const login = async function(event){
    event.preventDefault()
    try{
      if ( !email || !password ){
        setValidationAlert(true)
      }
      else{
        const OPTIONS = {
          method: "GET", 
        }
        fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=login&email=").concat(email).concat("&password=").concat(password), OPTIONS).then(function(response){
          response.json().then(function(data){
            let user = data.result[0]
            if (user){
              /** Store User Infos in Session */
              sessionStorage.setItem("user", JSON.stringify(user))
              /** Redirections */
              if (user.profile === "admin") router.replace("/application/manager")
              if (user.profile === "cashier") router.replace("/application/cashier/tickets")
              if (user.profile === "chief-cashier") router.replace("/application/chief-cashier/tickets")
              if (user.profile === "shop-cashier") router.replace("/application/shop-cashier/tickets")
              if (user.profile === "parking-cashier") router.replace("/application/parking-cashier/tickets")
              if (user.profile === "visitor") router.replace("/application/visitor")
            }
            else setAuthentificationAlert(true)
          })
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <CssBaseline />
      <Box 
        sx={{ 
          width: "100vw", 
          height: "100vh", 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.85)), url("/images/rabat_zoo_login_bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2
        }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={24}
            sx={{ 
              borderRadius: "16px", 
              p: { xs: 4, sm: 5 }, 
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/** Header Logo/Title */}
            <Stack alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
              <Avatar 
                sx={{ 
                  bgcolor: '#0ea5e9', 
                  width: 56, 
                  height: 56,
                  boxShadow: '0 8px 16px rgba(14, 165, 233, 0.3)'
                }}
              >
                <StyleIcon sx={{ fontSize: '1.8rem' }} />
              </Avatar>
              <Stack spacing={-0.5} alignItems="center">
                <Typography 
                  variant="h4" 
                  align="center" 
                  sx={{ 
                    fontWeight: 800, 
                    color: "#0f172a", 
                    fontFamily: '"Outfit", sans-serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  eTicket Pro
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: "#0ea5e9", 
                    fontWeight: 700, 
                    fontSize: "0.75rem", 
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}
                >
                  Zoo National de Rabat
                </Typography>
              </Stack>
            </Stack>

            {/** Inputs and Submission */}
            <Box component="form" onSubmit={login} sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Collapse in={validationAlert}>
                <Alert 
                  severity="error" 
                  action={<IconButton color="inherit" size="small" onClick={handleValidationAlert}> <CloseIcon fontSize="inherit" /> </IconButton>}
                  sx={{ borderRadius: "8px" }}
                >
                  <AlertTitle sx={{ fontWeight: 700 }}>Validation</AlertTitle>
                  Veuillez remplir tous les champs obligatoires avant de vous connecter.
                </Alert>
              </Collapse>
              <Collapse in={authentificationAlert}>
                <Alert 
                  severity="error" 
                  action={<IconButton color="inherit" size="small" onClick={handleAuthentificationAlert}> <CloseIcon fontSize="inherit" /> </IconButton>}
                  sx={{ borderRadius: "8px" }}
                >
                  <AlertTitle sx={{ fontWeight: 700 }}>Erreur d'accès</AlertTitle>
                  Email ou mot de passe incorrect. Veuillez réessayer.
                </Alert>
              </Collapse>

              <Typography variant="body2" sx={{ color: "#475569", align: "center", lineHeight: 1.6, textAlign: "center" }}>
                Identifiez-vous pour accéder à votre espace de travail (Administration, Billetterie ou Boutique).
              </Typography>

              <Stack spacing={2.5}>
                <TextField 
                  value={email} 
                  onChange={handleEmail} 
                  variant='outlined' 
                  label="Adresse Email" 
                  type="email"
                  required 
                  fullWidth 
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "8px" }
                  }}
                />
                <TextField 
                  value={password} 
                  onChange={handlePassword} 
                  variant='outlined' 
                  type="password" 
                  label="Mot de Passe" 
                  required 
                  fullWidth 
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#94a3b8', fontSize: '1.2rem' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "8px" }
                  }}
                />
              </Stack>

              <Button 
                type="submit" 
                size="large" 
                variant='contained' 
                color="primary"
                fullWidth
                sx={{ 
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)",
                  '&:hover': {
                    backgroundColor: '#0284c7',
                    boxShadow: "0 6px 20px rgba(14, 165, 233, 0.35)",
                  }
                }}
              >
                Se connecter
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
