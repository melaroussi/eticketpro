import * as React from 'react';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';

import { green, red, blueGrey, grey, yellow, blue } from '@mui/material/colors';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AlertTitle,Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Container  from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
 
// Icons Import
import CloseIcon  from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import { useRouter } from 'next/navigation'
 


export default function Section() {
  const router = useRouter()

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Data to fill lists */
  let [departments, setDepartments] = React.useState([])
  let [profiles, setProfiles] = React.useState([])

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [firstName, setFirstName] = React.useState()
  let [lastName, setLastName] = React.useState()
  let [email, setEmail] = React.useState()
  let [password, setPassword] = React.useState()
  let [gender, setGender] = React.useState()
  let [status, setStatus] = React.useState("Actif")
  let [departmentId, setDepartmentId] = React.useState(null)
  let [profile, setProfile] = React.useState("visitor")
  let [businessName, setBusinessName] = React.useState("")
  let [type, setType] = React.useState("Client Web")
  let [phone, setPhone] = React.useState()
  
  /** State handlers */
  const handleFirstName = function(event){
    setFirstName(event.target.value)
  }

  const handleLastName = function(event){
    setLastName(event.target.value)
  }

  const handleEmail = function(event){
    setEmail(event.target.value)
  }

  const handlePassword = function(event){
    setPassword(event.target.value)
  }

  const handleGender = function(event){
    setGender(event.target.value)
  }

  const handleStatus = function(event){
    setStatus(event.target.value)
  }

  const handleDepartmentId = function(event){
    setDepartmentId(event.target.value)
  }

  const handleProfile = function(event){
    setProfile(event.target.value)
  }

  const handlePhone = function(event){
    setPhone(event.target.value)
  }

  const handleBusinessName = function(event){
    setBusinessName(event.target.value)
  }

  const handleType = function(event){
    setType(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  /** Load and refresh hook */
  React.useEffect(function(){

  }, [loading])


  /** Save button action */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!firstName || !lastName || !email || !phone || !password || !gender ){
      setValidationAlert(true)
    }
    else{
      const OPTIONS = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender,
          status: status,
          departmentId: departmentId,
          profile: profile,
          businessName: businessName,
          type: type,
          phone: phone
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=create"), OPTIONS).then(function(response){
        router.replace('/application')
      })
    }
  }

  return (
    <Box component={"section"} id="subscribe-section" sx={{height: "100%"}}>
      <Container sx={{ py: 8 }} maxWidth="md" >
        {/* End hero unit */}
        <Grid container spacing={4}>
          
          <Grid item sm={12} md={6}>
            <Stack direction={"column"}>
              <Typography component="h1" variant="h4">
                Inscrivez-vous Gratuitement
              </Typography>
              <Typography variant="body2" component={"p"} paragraph>
                Pour vous inscrire, commencez par remplir le formulaire d'inscription en fournissant les informations requises. Une fois votre compte créé, connectez-vous à votre espace eTicket Pro. Vous pourrez alors acheter des tickets et gérer toutes vos transactions en toute simplicité.
              </Typography>
              <Typography variant="h6" paragraph>
                Votre espace eTicket Pro vous permet les fonctionnalités sivantes:
              </Typography>
            </Stack>
            <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Achat Sécurisé de Ticket en Ligne" size="medium"/>
            <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Consultation Détaillet des Billets" size="medium" />
            <Chip sx={{ mt: 1, mr: 1, backgroundColor: grey[100] }} label="Suivi de Vos Opérations en Ligne" size="medium" />
          </Grid>
    
          <Grid item sm={12} md={6}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Utilisateurs" subheader="Enregistrement" />
              <CardContent spacing={2}>
                {/** Section InputTests */}
                <Stack spacing={2}>
                <Collapse in={validationAlert}>
                  <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                    <AlertTitle>Validation</AlertTitle>
                    Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                  </Alert>
                </Collapse>
                  <Typography variant="body1" color="text.secondary">
                    Nous vous prions de saisir les champs obligatoires portants la mention (*). Les autres champs sont optionnels mais il est recommandé de saisir l'ensemble des données.
                  </Typography>
                  
                  <Stack spacing={2}>
                  <TextField value={firstName} onChange={handleFirstName} variant='outlined' size='small' label="Nom" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={lastName} onChange={handleLastName} variant='outlined' size='small' label="Prénom" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={email} onChange={handleEmail} variant='outlined' size='small' label="Email" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={phone} onChange={handlePhone} variant='outlined' size='small' label="Téléphone" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={password} onChange={handlePassword} variant='outlined' size='small' label="Mot de Passe" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={gender} onChange={handleGender} variant='outlined' size='small' label="Genre" required InputLabelProps={{ shrink: true }} id="gender-select" select>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </TextField>
                  </Stack>

                  <Stack spacing={1}>
                    <Button onClick={save} size="medium" variant='contained' fullWidth>Enregistrer</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container> 
    </Box>

  )
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
