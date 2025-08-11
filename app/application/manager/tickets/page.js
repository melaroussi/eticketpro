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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Icons Import
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QrCode2Icon from '@mui/icons-material/QrCode2';

/** Components import */
import NavigationSystem from '../components/NavigationSystem';

/** Hooks import */
import { useRouter } from 'next/navigation'
import { Map } from '@mui/icons-material';
 


const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()

  let [tickets, setTickets] = React.useState([])
  let [loading, setLoading] = React.useState(true)
  
  /** UseEffect */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    setTickets([])
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setTickets(list)
        setLoading(false)
      })
    })
  }, [])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/manager/tickets/create')
  }

  const loadUpdatePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/update?id=".concat(id))
  }

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/read?id=".concat(id))
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/delete?id=".concat(id))
  }
  
  const loadQRReadersPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/access?id=".concat(id))
  }

  const loadCanvasPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/canvas?id=".concat(id))
  }

  const loadAssignmentsPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/assignments?id=".concat(id))
  }

  const loadDiscountPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/discounts?id=".concat(id))
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"tickets"} element={"Gestion des Tickets"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** Data Table*/}
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Catégorie</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Prix (HT)</TableCell>
                    <TableCell align="left">Vente Digitale/Locale</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouveau
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tickets && tickets.map(function(row){
                      return(
                        <TableRow key={ row.id }>
                          <TableCell align="left">{ row.category }</TableCell>
                          <TableCell align="left">{ row.type }</TableCell>
                          <TableCell align="left">{ row.price }</TableCell>
                          <TableCell align="left">{ row.needReservation }</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={(e)=>loadUpdatePage(e, row.id)}>
                              <EditNoteIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={(e)=>loadReadPage(e, row.id)}>
                              <ReadMoreIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={(e)=>loadDeletePage(e, row.id)}>
                              <DeleteOutlineIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={(e)=>loadQRReadersPage(e, row.id)}>
                              <QrCode2Icon/>
                            </IconButton>
                            <Button variant="text" onClick={(e)=>loadDiscountPage(e, row.id)} endIcon={<AddCircleIcon/>}>
                              Promo
                            </Button>
                            <Button variant="text" onClick={(e)=>loadAssignmentsPage(e, row.id)} endIcon={<PeopleIcon/>}>
                              Affectations
                            </Button>
                            <Button variant="text" onClick={(e)=>loadCanvasPage(e, row.id)} endIcon={<Map/>} disabled={row.forGraphicalSell === 0}>
                              Canevas
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}