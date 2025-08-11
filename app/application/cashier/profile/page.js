"use client"
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { AlertTitle, Grid, Paper, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Container  from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment"
import ButtonGroup from "@mui/material/ButtonGroup"
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';

/** Colors imports */
import { green, pink, blue, grey } from "@mui/material/colors";

// Icons Import
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StyleIcon from "@mui/icons-material/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon  from "@mui/icons-material/Close";
import { DocumentScannerOutlined, ReportOffOutlined } from "@mui/icons-material";

/** Hooks */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import NavigationSystem from "../components/NavigationSystem";


const moment = require("moment"); 


export default function Dashboard(props) {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  
  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])


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
        response.json().then(function(data){
          /** Delete Old Session */
          if (sessionStorage.getItem("user"))  sessionStorage.removeItem("user")
          router.replace('/application')
        })
      })
    }
  }
  
  /** Load and refresh hook */
  React.useEffect(function(){
    if (onlineUser){
      setId(onlineUser.id)
      setFirstName(onlineUser.firstName)
      setLastName(onlineUser.lastName)
      setEmail(onlineUser.email)
      setPassword(onlineUser.password)
      setGender(onlineUser.gender)
      setDepartmentId(onlineUser.departmentId)
      setProfile(onlineUser.profile)
      setStatus(onlineUser.status)
      setPhone(onlineUser.phone)
      setBusinessName(onlineUser.businessName)
      setType(onlineUser.type)
    }

  }, [onlineUser])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/cashier/tickets')
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"profile"} element={"Espace Personnel"}/>
      </Grid>
      {/** Data Table*/}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}} >
        {/** UI */}
        <Container maxWidth={"md"}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Utilisateurs" subheader="Modification" />
            <CardContent spacing={2}>
              {/** Section InputTexts */}
              {
                onlineUser && <Stack spacing={2}>
                  <Collapse in={validationAlert}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation</AlertTitle>
                      Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                    </Alert>
                  </Collapse>
                  <Typography variant="body1" color="text.secondary">
                    Nous vous prions de saisir les champs obligatoires portants la mention (*). Les autres champs sont optionnels mais il est recommandé de saisir l'ensemble des données.
                  </Typography>
                  <Stack spacing={2} >
                    <TextField value={firstName} onChange={handleFirstName} variant='outlined' size='small' label="Nom" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={lastName} onChange={handleLastName} variant='outlined' size='small' label="Prénom" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={email} onChange={handleEmail} variant='outlined' size='small' label="Email" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={phone} onChange={handlePhone} variant='outlined' size='small' label="Téléphone" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={password} onChange={handlePassword} variant='outlined' size='small' label="Mot de Passe" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={businessName} onChange={handleBusinessName} variant='outlined' size='small' label="Raison Sociale" fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={gender} defaultValue={gender} onChange={handleGender} variant='outlined' size='small' label="Genre" required InputLabelProps={{ shrink: true }} select>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
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
      </Grid>
    </Grid>
  );
}
