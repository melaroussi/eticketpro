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
import { AlertTitle, Checkbox, FormControlLabel, Grid, Stack } from '@mui/material';
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

import { parseBooleans } from 'xml2js/lib/processors';

/** Components imports */
import NavigationSystem from '../../components/NavigationSystem';

const DRAWER_WIDTH = 250;

export default function Page() {

  const router = useRouter()
  const searchParams = useSearchParams()
 
  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [id, setId] = React.useState()
  let [category, setCategory] = React.useState()
  let [type, setType] = React.useState()
  let [price, setPrice] = React.useState()
  let [needReservation, setNeedReservation] = React.useState()
  let [minimumOrders, setMinimumOrders] = React.useState()
  let [onTimeDefinitionAllowedScanNumber, setOnTimeDefinitionAllowedScanNumber] = React.useState()
  let [allowedScanNumber, setAllowedScanNumber] = React.useState()
  let [NFCIdentifyer, setNFCIdentifyer] = React.useState()
  let [forParking, setForParking] = React.useState()
  let [forGraphicalSell, setForGraphicalSell] = React.useState()
  let [description, setDescription] = React.useState()
  
  /** Params : to be loaded from params table */
  let [categories, setCategoies] = React.useState([])

  /** Types */
  let [types, setTypes] = React.useState([
    "Adult",
    "Enfant",
    "Famille",
    "Groupe",
  ])

  /** State handlers */
  const handleCategory = function(event){
    setCategory(event.target.value)
  }

  const handleType = function(event){
    setType(event.target.value)
  }

  const handlePrice = function(event){
    setPrice(event.target.value)
  }

  const handleNeedReservation = function(event){
    setNeedReservation(event.target.value)
  }

  const handleMinimumOrders = function(event){
    setMinimumOrders(event.target.value)
  }

  const handleAllowedScanNumber = function(event){
    setAllowedScanNumber(event.target.value)
  }

  const handleOnTimeDefinitionAllowedScanNumber = function(event){
    setOnTimeDefinitionAllowedScanNumber(event.target.value)
  }
  
  const handleNFCIdentifyer = function(event){
    setNFCIdentifyer(event.target.value)
  }

  const handleForParking = function(event){
    setForParking(event.target.checked)
  }

  const handleForGraphicalSell = function(event){
    setForGraphicalSell(event.target.checked)
  }
  
  const handleDescription = function(event){
    setDescription(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  /** Save button action */
  const update = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!price || price <=0 || !category){
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
          category: category,
          type: type,
          price: price,
          needReservation: needReservation,
          minimumOrders: minimumOrders,
          allowedScanNumber: allowedScanNumber,
          onTimeDefinitionAllowedScanNumber: onTimeDefinitionAllowedScanNumber,
          NFCIdentifyer: NFCIdentifyer,
          forParking: forParking,
          forGraphicalSell: forGraphicalSell,
          description: description
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets?operation=update&id=").concat(id), OPTIONS).then(function(response){
        router.replace('/application/manager/tickets')
      })
    }
  }

 /** UseEffect */
 React.useEffect(function(){
  const OPTIONS = {
    method: "GET", 
  }
  setCategoies([])
  fetch(process.env.API_USER_ENDPOINT.concat("/categories"), OPTIONS).then(function(response){
    response.json().then(function(data){
      let list = data.result
      /** List */
      setCategoies(list.map(function(item){
        return item.label
      }))
      setLoading(false)
    })
  })
}, [])
  
  /** Load and refresh hook */
  React.useEffect(function(){
    
    const OPTIONS = {
      method: "GET", 
    }

    /** Get selected id */
    let id = searchParams.get('id')
    setId(id)
    /** Load department list */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(async function(data){
        if (data.result){
          let item = await data.result[0]
          if (item){
            /** Setters */
            setId(item.id)
            setCategory(item.category)
            setType(item.type)
            setPrice(item.price)
            setNeedReservation(item.needReservation)
            setMinimumOrders(item.minimumOrders)
            setOnTimeDefinitionAllowedScanNumber(item.onTimeDefinitionAllowedScanNumber)
            setNFCIdentifyer(item.NFCIdentifyer)
            setForParking(item.forParking)
            setForGraphicalSell(item.setForGraphicalSell)
            setDescription(item.description)
            /** Loading flag update */
            setLoading(false)
          }
        }
      })
    })

  }, [loading])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/tickets')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"tickets"} element={"Gestion des Tickets"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Tickets" subheader="Modification" />
            <CardContent spacing={2}>
              {/** Section InputTexts */}
              {
                !loading && <Stack spacing={2}>
                  <Collapse in={validationAlert}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation </AlertTitle>
                      Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                    </Alert>
                  </Collapse>
                  <Typography variant="body1" color="text.secondary">
                  {category} Nous vous prions de saisir les champs obligatoires portants la mention (*). Les autres champs sont optionnels mais il est recommandé de saisir l'ensemble des données.
                  </Typography>

                <Stack spacing={2}>
                  
                  <Stack spacing={0}>
                    <FormControlLabel control={<Checkbox checked={forGraphicalSell} onChange={handleForGraphicalSell} />} label="Vente Graphique" />
                    <FormControlLabel control={<Checkbox checked={forParking} onChange={handleForParking} />} label="Ticket pour Parking" />
                  </Stack>
                 
                  <TextField value={category} onChange={handleCategory} variant='outlined' size='small' label="Catégorie" autoFocus required fullWidth InputLabelProps={{ shrink: true }} select>
                    {
                      categories && categories.map(function(item){
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                      })
                    }
                  </TextField>
                  <TextField disabled={forParking || forGraphicalSell} value={type} onChange={handleType} variant='outlined' size='small' label="Type" required fullWidth InputLabelProps={{ shrink: true }} select>
                    {
                      types && types.map(function(item){
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                      })
                    }
                  </TextField>
                  <TextField value={price} disabled={forGraphicalSell} onChange={handlePrice} variant='outlined' type='number' size='small' label="Prix (HT)" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={minimumOrders} disabled={forParking || forGraphicalSell} onChange={handleMinimumOrders} variant='outlined' type='number' size='small' label="Nombre de Commande Minimal" required fullWidth InputLabelProps={{ shrink: true }}/>
                  <TextField value={needReservation} onChange={handleNeedReservation} variant='outlined' size='small' label="Vente Digitale/Locale" required InputLabelProps={{ shrink: true }} select>
                    <MenuItem value={"Vendable avec Reservation"}>Vendable avec Reservation</MenuItem>
                    <MenuItem value={"Vendable sans Reservation"}>Vendable sans Reservation</MenuItem>
                    <MenuItem value={"Vendable avec Reservation sur Place"}>Vendable avec Reservation sur Place</MenuItem>
                    <MenuItem value={"Vendable sans Reservation sur Place"}>Vendable sans Reservation sur Place</MenuItem>
                    <MenuItem value={"Vendable avec Reservation en Ligne"}>Vendable avec Reservation en Ligne</MenuItem>
                    <MenuItem value={"Vendable sans Reservation en Ligne"}>Vendable sans Reservation en Ligne</MenuItem>
                  </TextField>
                  <TextField value={description} onChange={handleDescription} multiline={true} rows={2} inputProps={{ maxLength: 100 }} variant='outlined' size='small' label="Description" fullWidth InputLabelProps={{ shrink: true }}/>      
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