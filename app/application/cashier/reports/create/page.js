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
import { green, grey, pink, blue } from '@mui/material/colors';

import { useRouter } from 'next/navigation'
import NavigationSystem from '../../components/NavigationSystem';
 
const DRAWER_WIDTH = 250;
const MM_PIXELS_RATIO = 2.83 // 72DPI

export default function Dashboard(props) {
  const router = useRouter()

  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  /** Getting Online User from Session */
  React.useEffect(function(){
    setUserId(onlineUser?.id)
  }, [onlineUser])

  
  /** Validation message flag */
  let [nullityValidationAlert, setNullityValidationAlert] = React.useState(false)
  let [negativityValidationAlert, setNegativityValidationAlert] = React.useState(false)

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [cashTurnover, setCashTurnover] = React.useState(0)
  let [TPETurnover, setTPETurnover] = React.useState(0)
  let [webTurnover, setWebTurnover] = React.useState(0)
  let [checkTurnover, setCheckTurnover] = React.useState(0)
  let [P200D, setP200D] = React.useState(0)
  let [P100D, setP100D] = React.useState(0)
  let [P50D, setP50D] = React.useState(0)
  let [P20D, setP20D] = React.useState(0)
  let [P10D, setP10D] = React.useState(0)
  let [P5D, setP5D] = React.useState(0)
  let [P2D, setP2D] = React.useState(0)
  let [P1D, setP1D] = React.useState(0)
  let [P50C, setP50C] = React.useState(0)
  let [P20C, setP20C] = React.useState(0)
  let [P10C, setP10C] = React.useState(0)
  let [P5C, setP5C] = React.useState(0)
  let [userId, setUserId] = React.useState(onlineUser?.id)

  /** State handlers */
  const handleCashTurnover = function(event){
    setCashTurnover(event.target.value)
  }

  const handleTPETurnover = function(event){
    setTPETurnover(event.target.value)
  }

  const handleWebTurnover = function(event){
    setWebTurnover(event.target.value)
  }

  const handleCheckTurnover = function(event){
    setCheckTurnover(event.target.value)
  }

  const handleP200D = function(event){
    setP200D(event.target.value)
  }

  const handleP100D = function(event){
    setP100D(event.target.value)
  }

  const handleP50D = function(event){
    setP50D(event.target.value)
  }

  const handleP20D = function(event){
    setP20D(event.target.value)
  }

  const handleP10D = function(event){
    setP10D(event.target.value)
  }

  const handleP5D = function(event){
    setP5D(event.target.value)
  }

  const handleP2D = function(event){
    setP2D(event.target.value)
  }

  const handleP1D = function(event){
    setP1D(event.target.value)
  }

  const handleP50C = function(event){
    setP50C(event.target.value)
  }

  const handleP20C = function(event){
    setP20C(event.target.value)
  }

  const handleP10C = function(event){
    setP10C(event.target.value)
  }

  const handleP5C = function(event){
    setP5C(event.target.value)
  }

  const handleNullityValidationAlert = function(event){
    setNullityValidationAlert(false)
  }

  const handleNegativityValidationAlert = function(event){
    setNegativityValidationAlert(false)
  }

  /** Load and refresh hook */
  React.useEffect(function(){

  }, [])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/cashier/reports')
  }

  /** Save button action */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    /*
    if (!cashTurnover || !TPETurnover || !webTurnover || !checkTurnover || !P200D || !P100D || !P20D || !P10D || !P5D || !P2D  || !P1D || !P50C || !P20C || !P10C || !P5C){
      setNullityValidationAlert(true)
    }*/
    if ( !userId || (cashTurnover===0 && TPETurnover===0 && webTurnover===0 && checkTurnover===0) || cashTurnover<0 || TPETurnover<0 || webTurnover<0 || checkTurnover<0 || P200D<0 || P100D<0 || P20D<0 || P10D<0 || P5D<0 || P2D<0 || P1D<0 || P50C<0 || P20C<0 || P10C<0 || P5C<0){
      setNegativityValidationAlert(true)
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
          cashTurnover: parseFloat(cashTurnover),
          TPETurnover: parseFloat(TPETurnover),
          webTurnover: parseFloat(webTurnover), 
          checkTurnover: parseFloat(checkTurnover), 
          turnover: parseFloat(cashTurnover)+parseFloat(TPETurnover)+parseFloat(webTurnover)+parseFloat(checkTurnover),
          P200D: parseInt(P200D),
          P100D: parseInt(P100D),
          P50D: parseInt(P50D),
          P20D: parseInt(P20D),
          P10D: parseInt(P10D),
          P5D: parseInt(P5D), 
          P2D: parseInt(P2D), 
          P1D: parseInt(P1D),
          P50C: parseInt(P50C),
          P20C: parseInt(P20C),
          P10C: parseInt(P10C),
          P5C: parseInt(P5C),
          userId: userId,
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=create"), OPTIONS).then(function(response){
        router.replace('/application/cashier/reports')
      })
    }
  }

  const checkAmounts = function(){
    if (cashTurnover == P200D*200+P100D*100+P50D*50+P20D*20+P10D*10+P5D*5+P2D*2+P1D+P50C*0.5+P20C*0.2+P10C*0.1+P5C*0.05){
      return false
    }else return true
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"tickets"} element={"Espace Billeterie"}/>
      </Grid>
      {/** Data Table*/}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10, overflow: 'scroll'}}>
        <Box style={{maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden'}}>
          {/** UI */}
          <Container maxWidth={'sm'} sx={{overflow:'auto'}}>
        
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Déclaration des PV de Clôture Journalière" subheader="Enregistrement" />
              <CardContent spacing={2}>
                {/** Section InputTests */}
                <Stack spacing={2}>
                  <Collapse in={checkAmounts()}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleNullityValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation</AlertTitle>
                      Le mantant que vous avez déclaré comme chiffre d'affaire Cash ({ cashTurnover } DH) n'est pas conforme aux nombre de billets et pièces déclarées ({P200D*200+P100D*100+P50D*50+P20D*20+P10D*10+P5D*5+P2D*2+P1D+P50C*0.5+P20C*0.2+P10C*0.1+P5C*0.05} DH). Merci d'ajuster les nombres de billets jusqu'a ce que le total soit identique.
                    </Alert>
                  </Collapse>
                  <Collapse in={nullityValidationAlert}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleNullityValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation</AlertTitle>
                      Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                    </Alert>
                  </Collapse>
                  <Collapse in={negativityValidationAlert}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleNegativityValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation</AlertTitle>
                      Les chiffres à saisire doivent être positifs pour les chiffres d'affaires et nombres de pièces.
                    </Alert>
                  </Collapse>
                  <Typography variant="body1" color="text.secondary">
                    Nous vous prions de saisir les champs obligatoires portants la mention (*). 
                  </Typography>

                  <Stack spacing={2}>
                    <TextField value={webTurnover} onChange={handleWebTurnover} variant='outlined' type='number' size='small' label="Web" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={TPETurnover} onChange={handleTPETurnover} variant='outlined' type='number' size='small' label="TPE" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={checkTurnover} onChange={handleCheckTurnover} variant='outlined' type='number' size='small' label="Chèque" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={cashTurnover} onChange={handleCashTurnover} variant='outlined' type='number' size='small' label="Cash" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P200D} onChange={handleP200D} variant='outlined' type='number' size='small' label="200 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P100D} onChange={handleP100D} variant='outlined' type='number' size='small' label="100 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P50D} onChange={handleP50D} variant='outlined' type='number' size='small' label="50 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P20D} onChange={handleP20D} variant='outlined' type='number' size='small' label="20 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P10D} onChange={handleP10D} variant='outlined' type='number' size='small' label="10 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P5D} onChange={handleP5D} variant='outlined' type='number' size='small' label="5 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P2D} onChange={handleP2D} variant='outlined' type='number' size='small' label="2 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P1D} onChange={handleP1D} variant='outlined' type='number' size='small' label="1 DH" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P50C} onChange={handleP50C} variant='outlined' type='number' size='small' label="50 Centimes" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P20C} onChange={handleP20C} variant='outlined' type='number' size='small' label="20 Centimes" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P10C} onChange={handleP10C} variant='outlined' type='number' size='small' label="10 Centimes" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={P5C} onChange={handleP5C} variant='outlined' type='number' size='small' label="5 Centimes" required fullWidth InputLabelProps={{ shrink: true }}/>
                  </Stack>

                  <Stack spacing={1}>
                    <Button onClick={save} size="medium" variant='contained' fullWidth>Enregistrer</Button>
                    <Button onClick={cancel} size="medium" variant='outlined' fullWidth>Annuler</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}