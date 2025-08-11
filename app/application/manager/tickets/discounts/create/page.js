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

/** Components imports */
import NavigationSystem from '../../../components/NavigationSystem';

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [startDatetime, setStartDatetime] = React.useState(new Date())
  let [stopDatetime, setStopDatetime] = React.useState(new Date())
  let [rate, setRate] = React.useState(20)
  
  
  /** State handlers */
  const handleStartDatetime = function(event){
    setStartDatetime(event.target.value)
  }

  const handleStopDatetime = function(event){
    setStopDatetime(event.target.value)
  }

  const handleRate = function(event){
    setRate(event.target.value)
  }

  /** Load and refresh hook */
  React.useEffect(function(){

  }, [])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace("/application/manager/tickets/discounts?id=".concat(searchParams.get("id")))
  }

  /** Save button action */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!startDatetime || !stopDatetime || !rate){
      setValidationAlert(true)
    }
    else{
      /** Getting Ticket ID */
      let id = searchParams.get("id")
      alert(id)
      const OPTIONS = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDatetime: startDatetime,
          stopDatetime: stopDatetime,
          rate: rate,
          ticketId: id
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets/discounts?operation=create"), OPTIONS).then(function(response){
        router.replace("/application/manager/tickets/discounts?id=".concat(id))
      })
    }
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"discount"} element={"Gestion des Promotions"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
      
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Promotions" subheader="Enregistrement" />
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
                  <TextField value={startDatetime} onChange={handleStartDatetime} type='date' variant='outlined' size='small' label="Début" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={stopDatetime} onChange={handleStopDatetime} type='date' variant='outlined' size='small' label="Fin" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                <TextField value={rate} onChange={handleRate} type={'number'} inputProps={{ maxLength: 100 }} variant='outlined' size='small' label="Taux (%)" fullWidth InputLabelProps={{ shrink: true }}/>
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
    </Box>
  );
}