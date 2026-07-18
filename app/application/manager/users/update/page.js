"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AlertTitle, Grid, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Container  from '@mui/material/Container';
import Card from '@mui/material/Card';
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
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import CloseIcon  from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/** Colors imports */
import { green, pink, blue } from '@mui/material/colors';

/** Hooks */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

/** Components imports */
import NavigationSystem from '../../components/NavigationSystem';

const DRAWER_WIDTH = 250;

export default function Page() {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Data to fill lists */
  let [departments, setDepartments] = React.useState([])
  let [profiles, setProfiles] = React.useState([])

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [id, setId] = React.useState()
  let [firstName, setFirstName] = React.useState()
  let [lastName, setLastName] = React.useState()
  let [email, setEmail] = React.useState()
  let [password, setPassword] = React.useState()
  let [gender, setGender] = React.useState()
  let [status, setStatus] = React.useState()
  let [departmentId, setDepartmentId] = React.useState()
  let [profile, setProfile] = React.useState()
  let [businessName, setBusinessName] = React.useState()
  let [type, setType] = React.useState()
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

  /** Save button action */
  const update = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!firstName || !lastName || !email || !phone || !password || !gender || !status || !departmentId || !profile){
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
      fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=update&id=").concat(id), OPTIONS).then(function(response){
        router.replace('/application/manager/users')
      })
    }
  }
  
  /** Load and refresh hook */
  React.useEffect(function(){
    
    const OPTIONS = {
      method: "GET", 
    }

    /** Get selected id */
    let id = searchParams.get('id')
    setId(id)
    /** Load department list */
    fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=get-one&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(async function(data){
        if (data.result){
          let item = await data.result[0]
         
          if (item){
            setId(item.id)
            setFirstName(item.firstName)
            setLastName(item.lastName)
            setEmail(item.email)
            setPassword(item.password)
            setGender(item.gender)
            setDepartmentId(item.departmentId)
            setProfile(item.profile)
            setStatus(item.status)
            setPhone(item.phone)
            setBusinessName(item.businessName)
            setType(item.type)
          }
          setLoading(false)
        }
      })
    })

    /** Load and refresh hook */
    fetch(process.env.API_USER_ENDPOINT.concat("/departments"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        setDepartments(list)
      })
    })
  }, [searchParams])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/users')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"users"} element={"Gestion des Utilisteurs"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Utilisateurs" subheader="Modification" />
            <CardContent spacing={2}>
              {/** Section InputTexts */}
              {
                !loading && <Stack spacing={2}>
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
                    <TextField value={businessName} onChange={handleBusinessName} variant='outlined' size='small' label="Raison Sociale" fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={departmentId} defaultValue={departmentId} onChange={handleDepartmentId} variant='outlined' size='small' label="Département" required fullWidth InputLabelProps={{ shrink: true }} select id="department-select">
                      {
                        departments && departments.map(function(item, index){
                          return <MenuItem key={item} value={item.id}>{item.label}</MenuItem>
                        })
                      }
                    </TextField>
                    <TextField value={profile} onChange={handleProfile} variant='outlined' size='small' label="Profile" required fullWidth InputLabelProps={{ shrink: true }} select id="profile-select">
                    <MenuItem value={"admin"}>Administrateur</MenuItem>
                    <MenuItem value={"cashier"}>Caissier</MenuItem>
                    <MenuItem value={"chief-cashier"}>Chef Caissier</MenuItem>
                    <MenuItem value={"shop-cashier"}>Caissier de Boutique</MenuItem>
                    <MenuItem value={"parking-cashier"}>Agent de Parking</MenuItem>
                    <MenuItem value={"B2B"}>B2B</MenuItem>
                    </TextField>
                    <TextField value={gender} defaultValue={gender} onChange={handleGender} variant='outlined' size='small' label="Genre" required InputLabelProps={{ shrink: true }} select>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </TextField>
                    <TextField value={status} defaultValue={status} onChange={handleStatus} variant='outlined' size='small' label="Status" required InputLabelProps={{ shrink: true }} select>
                      <MenuItem value={"Inactif"}>Inactif</MenuItem>
                      <MenuItem value={"Actif"}>Actif</MenuItem>
                    </TextField>
                    <TextField value={type} defaultValue={type} onChange={handleType} variant='outlined' size='small' label="Type" required InputLabelProps={{ shrink: true }} select>
                      <MenuItem value={"Organisateur"}>Organisateur</MenuItem>
                      <MenuItem value={"Service Permanant"}>Service Permanant</MenuItem>
                    </TextField>
                  </Stack>

                  <Stack spacing={1}>
                    <Button onClick={update} size="medium" variant='contained' fullWidth>Modifier</Button>
                    <Button onClick={cancel} size="medium" variant='outlined' fullWidth>Annuler</Button>
                  </Stack>
                </Stack>
              }
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
