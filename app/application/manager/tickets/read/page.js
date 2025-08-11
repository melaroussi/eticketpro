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
  let [ticket, setTicket] = React.useState()
  
  /** Loadi ng flag */
  let [loading, setLoading] = React.useState(true)
  
  /** Load and refresh hook */
  React.useEffect(function(){
    /** Get selected id */
    let id = searchParams.get('id')
    /** Load ticket list */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setTicket(data.result[0])
          setLoading(false)
        }
      })
    })
  }, [searchParams, loading])

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
        <Container maxWidth={'xs'}>
      
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><StorageIcon /></Avatar>} title="Gestion des Ticketes" subheader="Fiche Ticket" />
            <CardContent spacing={2} disablePadding={true}>
              {/** Section InputTests */}
              <Stack spacing={2}>
                <Typography variant="body2">
                  Cette interface offre un aperçu concis des enregistrements, permettant une consultation rapide. Pour une analyse plus approfondie, explorez les détails détaillés de chaque enregistrement à votre disposition.
                </Typography>
                {
                  ticket && <Stack spacing={0}>
                    <Typography variant='button'>Catégorie : { ticket.category}</Typography>
                    <Typography variant='button'>Type : { ticket.type}</Typography>
                    <Typography variant='button'>Prix : { ticket.price}</Typography>
                    <Typography variant='button'>Vente Digitale/Locale : { ticket.needReservation }</Typography>
                    <Typography variant='button'>Quantité Minimale : { ticket.minimumOrders }</Typography>
                    <Typography variant='button'>Nombre de Scans Autorisé (s) : { ticket.allowedScanNumber }</Typography>
                    <Typography variant='button'>Nombre de Scans à Définir à l'Achat : { ticket.onTimeDefinitionAllowedScanNumber }</Typography>
                    <Typography variant='button'>NIdentifiant NFC : { ticket.NFCIdentifyer }</Typography>
                    <Typography variant='button'>Usage Parking : { ticket.forParking ? "Oui" : "Non" }</Typography>
                    <Typography variant='button'>Vente Graphique : { ticket.forGraphicalSell ? "Oui" : "Non" }</Typography>
                    <Typography variant='button'>Description : { ticket.description }</Typography>
                  </Stack>
                }
                <Stack spacing={0}>
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