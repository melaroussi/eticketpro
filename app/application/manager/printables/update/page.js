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

import { useRouter, useSearchParams } from 'next/navigation'
 
const DRAWER_WIDTH = 250;
const MM_PIXELS_RATIO = 2.83 // 72DPI

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Selected Object */
  let [selectedSize, setSelectedSize] = React.useState()

  /** Form data */
  let [id, setId] = React.useState()
  let [size, setSize] = React.useState()
  let [width, setWidth] = React.useState()
  let [height, setHeight] = React.useState()
  let [orientation, setOrientation] = React.useState()
  let [elementAX, setElementAX] = React.useState(20)
  let [elementAY, setElementAY] = React.useState(10)
  let [elementBX, setElementBX] = React.useState(20)
  let [elementBY, setElementBY] = React.useState(20)
  let [elementCX, setElementCX] = React.useState(20)
  let [elementCY, setElementCY] = React.useState(30)
  let [elementDX, setElementDX] = React.useState(20)
  let [elementDY, setElementDY] = React.useState(40)

  /** State handlers */
  const handleSize = function(event){
    setSize(event.target.value)
  }

  const handleWidth = function(event){
    setWidth(event.target.value)
  }

  const handleHeight = function(event){
    setHeight(event.target.value)
  }

  const handleOrientation = function(event){
    setOrientation(event.target.value)
  }

  const handleElementAX = function(event){
    setElementAX(event.target.value)
  }

  const handleElementAY = function(event){
    setElementAY(event.target.value)
  }

  const handleElementBX = function(event){
    setElementBX(event.target.value)
  }

  const handleElementBY = function(event){
    setElementBY(event.target.value)
  }

  const handleElementCX = function(event){
    setElementCX(event.target.value)
  }

  const handleElementCY = function(event){
    setElementCY(event.target.value)
  }

  const handleElementDX = function(event){
    setElementDX(event.target.value)
  }

  const handleElementDY = function(event){
    setElementDY(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  /** Load and refresh hook */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Get selected id */
    let id = searchParams.get('id')
    fetch(process.env.API_USER_ENDPOINT.concat("/printables?operation=get-one&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        if (list){
          setId(list[0].id)
          setSize(list[0].size)
          setWidth(list[0].width)
          setHeight(list[0].height)
          setOrientation(list[0].orientation)
          setElementAX(list[0].elementAX)
          setElementAY(list[0].elementAY)
          setElementBX(list[0].elementBX)
          setElementBY(list[0].elementBY)
          setElementCX(list[0].elementCX)
          setElementCY(list[0].elementCY)
          setElementDX(list[0].elementDX)
          setElementDY(list[0].elementDY)
          alert(JSON.stringify(list))
          setLoading(false)
        }
      })
    })
  }, [])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/printables')
  }

  /** Save button action */
  const update = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!size || !elementAX || !orientation || !elementAY || !elementBX || !elementBY || !elementCX || !elementCY || !elementDX || !elementDY){
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
          size: size,
          width: width, 
          height: height, 
          orientation: orientation,
          elementAX: parseInt(elementAX), 
          elementAY: parseInt(elementAY), 
          elementBX: parseInt(elementBX), 
          elementBY: parseInt(elementBY), 
          elementCX: parseInt(elementCX), 
          elementCY: parseInt(elementCY), 
          elementDX: parseInt(elementDX), 
          elementDY: parseInt(elementDY), 
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/printables?operation=update&id=").concat(id), OPTIONS).then(function(response){
        router.replace('/application/manager/printables')
      })
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"printables"} element={"Gestion des Modèles de Tickets"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
      
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Départements" subheader="Enregistrement" />
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
                {orientation}Nous vous prions de saisir les champs obligatoires portants la mention (*). Les autres champs sont optionnels mais il est recommandé de saisir l'ensemble des données. Merci de saisir les dimensions et coordonnées des elements en Pixels sachant que l'affichage est en 76DPI (1mm = {MM_PIXELS_RATIO } Pixels).
                </Typography>
                
                <Stack spacing={2}>
                  <TextField value={size} onChange={handleSize} variant='outlined' type='text' size='small' label="Format" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={orientation} onLoad={handleOrientation} defaultValue={orientation} onChange={handleOrientation} variant='outlined' size='small' label="Orientation" required fullWidth InputLabelProps={{ shrink: true }} select>
                    <MenuItem label={"portrait"} value={"portrait"} >Portrait</MenuItem>
                    <MenuItem label={"landscape"} value={"landscape"} >Paysage </MenuItem>
                  </TextField>
                  <TextField value={width} onChange={handleWidth} variant='outlined' type='number' size='small' label="Largeur (mm)" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={height} onChange={handleHeight} variant='outlined' type='number' size='small' label="Hauteur (mm)" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementAX} onChange={handleElementAX} variant='outlined' type='number' size='small' label="Element 1 (X)" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementAY} onChange={handleElementAY} variant='outlined' type='number' size='small' label="Element 1 (Y)" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementBX} onChange={handleElementBX} variant='outlined' type='number' size='small' label="Element 2 (X)" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementBY} onChange={handleElementBY} variant='outlined' type='number' size='small' label="Element 2 (Y)" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementCX} onChange={handleElementCX} variant='outlined' type='number' size='small' label="Element 3 (X)" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementCY} onChange={handleElementCY} variant='outlined' type='number' size='small' label="Element 3 (Y)" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementDX} onChange={handleElementDX} variant='outlined' type='number' size='small' label="Element 4 (X)" fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={elementDY} onChange={handleElementDY} variant='outlined' type='number' size='small' label="Element 4 (Y)" fullWidth InputLabelProps={{ shrink: true }}/>
                  
                </Stack>

                <Stack spacing={1}>
                  <Button onClick={update} size="medium" variant='contained' fullWidth>Modifier</Button>
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