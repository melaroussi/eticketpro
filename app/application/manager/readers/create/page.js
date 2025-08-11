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
import NavigationSystem from '../../components/NavigationSystem';

import { useRouter } from 'next/navigation'
 


const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Loading flag */
  let [zones, setZones] = React.useState([])

  /** Form data */
  let [label, setLabel] = React.useState()
  let [ip, setIP] = React.useState()
  let [zoneId, setZoneId] = React.useState()
  
  /** State handlers */
  const handleLabel = function(event){
    setLabel(event.target.value)
  }

  const handleIP = function(event){
    setIP(event.target.value)
  }

  const handleZoneId = function(event){
    setZoneId(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  /** Load and refresh hook */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Load and refresh hook */
    fetch(process.env.API_USER_ENDPOINT.concat("/zones"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        setZones(list)
      })
    })
  }, [])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/readers')
  }

  /** Save button action */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!label || !ip || !zoneId){
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
          label: label,
          ip: ip,
          zoneId: zoneId
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/readers?operation=create"), OPTIONS).then(function(response){
        router.replace('/application/manager/readers')
      })
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"readers"} element={"Gestion des Lecteurs"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
      
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Lecteurs" subheader="Enregistrement" />
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
                  <TextField value={label} onChange={handleLabel} variant='outlined' size='small' label="Label" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={ip} onChange={handleIP} inputProps={{ maxLength: 100 }} variant='outlined' size='small' label="Adresse IP" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={zoneId} onChange={handleZoneId} variant='outlined' size='small' label="Zone" required fullWidth InputLabelProps={{ shrink: true }} select>
                    {
                      zones && zones.map(function(item, index){
                        return <MenuItem key={item} value={item.id}>{item.label}</MenuItem>
                      })
                    }
                  </TextField>
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