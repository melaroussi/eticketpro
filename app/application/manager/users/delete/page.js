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
import { Grid, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';

import Container  from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
   
import ListItemAvatar from '@mui/material/ListItemAvatar';


// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/** Colors imports */
import { green, pink, blue } from '@mui/material/colors';

/** Components imports */
import NavigationSystem from '../../components/NavigationSystem';

import { useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'



const DRAWER_WIDTH = 250;

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  /** Data to fill lists */
  let [user, setUser] = React.useState()
  
  /** Loadi ng flag */
  let [loading, setLoading] = React.useState(true)
  
  /** Load and refresh hook */
  React.useEffect(function(){
    /** Get selected id */
    let id = searchParams.get('id')
    /** Load department list */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/users?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setUser(data.result[0])
          setLoading(false)
        }
        
      })
    })
  }, [searchParams, loading])

  /** Cancel button action */
  const distroy = function(event){
    event.preventDefault()
    /** Get selected id */
    let id = searchParams.get('id')
    /** Load department list */
    const OPTIONS = {
      method: "DELETE", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=get-one&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        router.replace('/application/manager/users')
      })
    })
  }

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/manager/users')
  }

  /** Get Profile Label */
  const getProfileLabel = function(constant){
    if (constant === "admin") return "Administrateur"
    else if (constant === "cashier") return "Caissier"
    else if (constant === "chief-cashier") return "Chef de Caisse"
    else if (constant === "parking-cashier") return "Agent de Parking"
    else if (constant === "shop-cashier") return "Caissier de Boutique"
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"users"} element={"Gestion des Utilisteurs"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Container maxWidth={'xs'}>
      
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><StorageIcon /></Avatar>} title="Gestion des Utilisateurs" subheader="Suppression" />
            <CardContent spacing={2} disablePadding={true}>
              {/** Section InputTests */}
              <Stack spacing={2}>
                <Typography variant="body2">
                 Cette interface présente les détails de l'enregistrement pour une confirmation préalable à sa suppression.
                </Typography>
                {
                  user && <Stack spacing={0}>
                    <Typography variant='button'>Nom : { user.firstName }</Typography>
                    <Typography variant='button'>Prénom : { user.lastName }</Typography>
                    <Typography variant='button'>E-mail : { user.email }</Typography>
                    <Typography variant='button'>Téléphone : { user.phone }</Typography>
                    <Typography variant='button'>Genre : { user.gender }</Typography>
                    <Typography variant='button'>Profile : { getProfileLabel(user.profile) }</Typography>
                    <Typography variant='button'>Raison Sociale : { user.businessName }</Typography>
                    <Typography variant='button'>Type : { user.type }</Typography>
                    <Typography variant='button'>Département : { user.department }</Typography>
                    <Typography variant='button'>Status : { user.status }</Typography>
                  </Stack>
                }
                <Stack spacing={1}>
                  <Button onClick={distroy} size="medium" variant='contained' fullWidth>Supprimer</Button>
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