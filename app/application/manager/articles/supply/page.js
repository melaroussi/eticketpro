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
import { AlertTitle, Grid, Stack, setRef } from '@mui/material';
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

  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [id, setId] = React.useState()
  let [reference, setReference] = React.useState()
  let [category, setCategory] = React.useState()
  let [label, setLabel] = React.useState()
  let [price, setPrice] = React.useState()
  let [VATRate, setVATRate] = React.useState(20)
  let [warehousing, setWarehousing] = React.useState(false)
  let [availableQuantity, setAvailableQuantity] = React.useState()
  let [description, setDescription] = React.useState()

  /** Params : to be loaded from params table */
  let [categories, setCategoies] = React.useState([
    "Ballon",
    "Bonnet",
    "Bracelet",
    "Cadre",
    "Cryon"
  ])

  /** Params : to be loaded from params table */
  let [warehousers, setwWarehousers] = React.useState([
    "Aucun",
    "CMUP"
  ])

  /** State handlers */
  const handleReference = function(event){
    setReference(event.target.value)
  }

  const handleCategory = function(event){
    setCategory(event.target.value)
  }

  const handleLabel = function(event){
    setLabel(event.target.value)
  }

  const handlePrice = function(event){
    setPrice(event.target.value)
  }

  const handleVATRate = function(event){
    setVATRate(event.target.value)
  }

  const handleWarehousing = function(event){
    setWarehousing(event.target.value)
  }

  const handleAvailableQuantity = function(event){
    setAvailableQuantity(event.target.value)
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
    if (!reference || !category || !label || !price || price < 0 || !VATRate || VATRate<0 || VATRate>100|| !warehousing || !availableQuantity){
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
          reference: reference,
          category: category,
          label: label,
          price: price,
          VATRate: VATRate,
          warehousing: warehousing,
          availableQuantity: availableQuantity,
          description: description
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/articles?operation=update&id=").concat(id), OPTIONS).then(function(response){
        router.replace('/application/manager/articles')
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
    fetch(process.env.API_USER_ENDPOINT.concat("/articles?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(async function(data){
        if (data.result){
          let item = await data.result[0]
          
          if (item){
            setReference(item.reference)
            setCategory(item.category)
            setLabel(item.label)
            setPrice(item.price)
            setVATRate(item.VATRate)
            setWarehousing(item.warehousing)
            setAvailableQuantity(item.availableQuantity)
            setDescription(item.description)
            /** Loading flag update */
            setLoading(false)
          }
        }
      })
    })

  }, [searchParams, loading])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/articles')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"articles"} element={"Gestion des Articles"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'sm'}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Gestion des Articles" subheader="Modification" />
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
                    <TextField value={availableQuantity} defaultValue={availableQuantity} onChange={handleAvailableQuantity} variant='outlined' type='number' size='small' label="Quantité d'Approvisionnement" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={reference} defaultValue={reference} onChange={handleReference} variant='outlined' size='small' label="Réference" autoFocus required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={label} defaultValue={label} onChange={handleLabel} variant='outlined' size='small' label="Label" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={category} defaultValue={category} onChange={handleCategory} variant='outlined' size='small' label="Catégorie" required fullWidth InputLabelProps={{ shrink: true }} select>
                      {
                        categories && categories.map(function(item){
                          return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })
                      }
                    </TextField>
                    <TextField disabled value={warehousing} defaultValue={warehousing} onChange={handleWarehousing} variant='outlined' size='small' label="Suivi du Stock" required fullWidth InputLabelProps={{ shrink: true }} select>
                      {
                        warehousers && warehousers.map(function(item){
                          return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })
                      }
                    </TextField>
                    <TextField disabled value={price} defaultValue={price} onChange={handlePrice} variant='outlined' type='number' size='small' label="Prix (HT)" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={VATRate} defaultValue={VATRate} onChange={handleVATRate} variant='outlined' type='number' size='small' label="TVA (%)" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={availableQuantity} defaultValue={availableQuantity} onChange={handleAvailableQuantity} variant='outlined' type='number' size='small' label="Quantité en Stock" required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField disabled value={description} defaultValue={description} onChange={handleDescription} multiline={true} rows={2} inputProps={{ maxLength: 100 }} variant='outlined' size='small' label="Description" fullWidth InputLabelProps={{ shrink: true }}/>      
                  </Stack>
               
                  <Stack spacing={1}>
                    <Button onClick={update} size="medium" variant='contained' fullWidth>Approvisionner le Stock</Button>
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