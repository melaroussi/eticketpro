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
import { DocumentScannerOutlined, PrintOutlined } from "@mui/icons-material";  
import ListItemAvatar from '@mui/material/ListItemAvatar';


// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';

/** Colors imports */
import { green, pink, blue, grey } from '@mui/material/colors';

/** Components imports */

import { useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'
import NavigationSystem from '../../components/NavigationSystem';



const DRAWER_WIDTH = 250;

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  /** Data to fill lists */
  let [reports, setReports] = React.useState()
  
  /** Loadi ng flag */
  let [loading, setLoading] = React.useState(true)
  
  /** Load and refresh hook */
  React.useEffect(function(){
    /** Get selected id */
    let id = searchParams.get('id')
    /** Load reports list */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=get-one&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setReports(data.result[0])
          setLoading(false)
        }
        
      })
    })
  }, [searchParams, loading])

  /** Cancel button action */
  const cancel = function(event){
    event.preventDefault()
    router.replace('/application/cashier/reports')
  }

  const loadDailyReportPage = function(event, id){
    event.preventDefault()
    router.replace("/application/cashier/reports/printable/cashier-daily-report?id=".concat(id))
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"tickets"} element={"Espace Billeterie"}/>
      </Grid>
      {/** Data Table*/}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}}>
        {/** Dashboard Main */}
        <Container maxWidth={'xs'}>     
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><StorageIcon /></Avatar>} title="Détails du PV de Clôture" subheader="Consultation" />
            <CardContent spacing={2} disablePadding={true}>
              {/** Section InputTests */}
              <Stack spacing={2}>
                <Typography variant="body2">
                  Cette interface présente les détails de l'enregistrement pour une confirmation préalable à sa suppression.
                </Typography>
                {
                  reports && <Stack spacing={0}>
                    <Typography variant='button'>TPE : { reports.TPETurnover }</Typography>
                    <Typography variant='button'>Cash : { reports.cashTurnover }</Typography>
                    <Typography variant='button'>Web : { reports.webTurnover }</Typography>
                    <Typography variant='button'>Chèque : { reports.checkTurnover }</Typography>
                    <Typography variant='button'>Total : { reports.turnover }</Typography>
                    <Typography variant='button'>200 DH : { reports.P200D }</Typography>
                    <Typography variant='button'>100 DH : { reports.P100D }</Typography>
                    <Typography variant='button'>50 DH : { reports.P50D }</Typography>
                    <Typography variant='button'>20 DH : { reports.P20D }</Typography>
                    <Typography variant='button'>10 DH : { reports.P10D }</Typography>
                    <Typography variant='button'>5 DH : { reports.P5D }</Typography>
                    <Typography variant='button'>2 DH : { reports.P2D }</Typography>
                    <Typography variant='button'>1 DH : { reports.P1D }</Typography>
                    <Typography variant='button'>50 Centimes : { reports.P50C }</Typography>
                    <Typography variant='button'>20 Centimes : { reports.P20C }</Typography>
                    <Typography variant='button'>10 Centimes : { reports.P10C }</Typography>
                    <Typography variant='button'>5 Centimes : { reports.P5C }</Typography>
                  </Stack>
                }
                <Stack spacing={1}>
                  <Button onClick={cancel} size="medium" variant='outlined' fullWidth>Annuler</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
}