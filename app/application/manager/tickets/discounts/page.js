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
import { ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';

// Icons Import
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/** Components import */
import NavigationSystem from '../../components/NavigationSystem';

/** Hooks import */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

/** Moments Imports */
const moment = require("moment")

const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  let [discounts, setDiscounts] = React.useState([])
  let [ticketId, setTicketId] = React.useState()
  let [loading, setLoading] = React.useState(true)
  

  /** UseEffect */
  React.useEffect(function(){
    /** Getting Ticket ID */
    let id = searchParams.get("id")
    setTicketId(id)
  }, [])

  /** UseEffect */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** */
    setDiscounts([])
    /** Getting Ticket ID */
    let id = searchParams.get("id")
    
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/discounts"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setDiscounts(list.filter(function(item){
          return item.ticketId == ticketId
        }))
        setLoading(false)
      })
    })
  }, [ticketId])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace("/application/manager/tickets/discounts/create?id=".concat(ticketId))
  }

  const loadUpdatePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/discounts/update?id".concat(ticketId))
  }

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/discounts/read?id=".concat(ticketId))
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/discounts/delete?id=".concat(ticketId))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"discounts"} element={"Gestion des Promotions"}/>

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
                    <TableCell align="left">Début</TableCell>
                    <TableCell align="left">Fin</TableCell>
                    <TableCell align="left">Taux (%)</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouveau
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    discounts.map(function(row){
                      return(
                        <TableRow key={ row.id }>
                          <TableCell align="left">{ moment(row.startDatetime).format("DD/MM/YYYY") }</TableCell>
                          <TableCell align="left">{ moment(row.stopDatetime).format("DD/MM/YYYY") }</TableCell>
                          <TableCell align="left">{ row.rate }</TableCell>
                          <TableCell align="right">

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