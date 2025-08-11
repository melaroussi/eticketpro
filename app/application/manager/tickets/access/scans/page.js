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
import { Grid, Stack, TextField } from '@mui/material';
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
import QrCode2Icon from '@mui/icons-material/QrCode2';

/** Components import */
import NavigationSystem from '../../../components/NavigationSystem';

/** Hooks import */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'



const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  let [accessList, setAccessList] = React.useState([])
  let [ticket, setTicket] = React.useState()
  let [loading, setLoading] = React.useState(true)
  
  let [zoneScans, setZoneScans] = React.useState([])
  
  const load = function(){
    let OPTIONS = {
      method: "GET", 
    }
    /** Loading Access List */
    setAccessList([])
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setAccessList(list)
        setLoading(false)
      })
    })
    /** Loading Ticket Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setTicket(data.result[0])
          setLoading(false)
        }
      })
    })

    /** Loading Ticket Infos */
    OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/get-zone-scans?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setZoneScans(list)
      })
    })
  }

  /** UseEffect */
  React.useEffect(function(){
    load()
  }, [loading])

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/tickets/read?id=".concat(id))
  }

  const activateZoneReaders = function(event, zoneId){
    event.preventDefault()
    
    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zoneId: zoneId
      })
    }
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?operation=activate-zone-readers&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  

  const initReaders = function(event){

    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    }
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?operation=init-readers&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const handleToggle = function(event, id, status){
    event.preventDefault()
    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorised: status ? 0 : 1
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?operation=update-toggle&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const initZones = function(event){

    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    }
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?operation=init-zones&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const handleScanNumber = function(event, id){
    event.preventDefault()
    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scanNumber: event.target.value
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/access?operation=update-scan-number&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
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
            <Stack spacing={2}>
              {/** Ticket Info */}
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Catégorie</TableCell>
                      <TableCell align="left">Type</TableCell>
                      <TableCell align="left">Prix (HT)</TableCell>
                      <TableCell align="left">Vente Digitale/Locale</TableCell>
                      <TableCell align="left">Minimum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                    ticket && <TableRow>
                      <TableCell align="left">{ ticket.category }</TableCell>
                      <TableCell align="left">{ ticket.type }</TableCell>
                      <TableCell align="left">{ ticket.price }</TableCell>
                      <TableCell align="left">{ ticket.needReservation }</TableCell>
                      <TableCell align="left">{ ticket.minimumOrders }</TableCell>
                    </TableRow>
                  }
                  </TableBody>
                </Table>
              </TableContainer>
              {/** Zones List */}
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Label</TableCell>
                      <TableCell align="left">Scans</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={(e)=>initZones(e)}>
                          Initialiser les Zones
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      zoneScans.map(function(row){
                        return(
                          <TableRow key={ row.id }>
                            <TableCell align="left">{ row.label }</TableCell>
                            <TableCell align="left">
                              <TextField value={row.scanNumber} onChange={(e)=>handleScanNumber(e, row.id)} variant='outlined' type='number' size='small' sx={{width:60}} required fullWidth/>
                            </TableCell>
                            <TableCell align="left">{ row.description }</TableCell>
                            <TableCell align="right">
                              <Button color="primary" onClick={(e)=>activateZoneReaders(e, row.id)}>
                                Activer les Lecteurs
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {/** Access List Infos */}
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Zone</TableCell>
                      <TableCell align="left">Lecteur</TableCell>
                      <TableCell align="left">Adresse IP</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={(e)=>initReaders(e)}>
                          Initialiser les Lecteurs
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      accessList && accessList.map(function(row, index){
                        return(
                          <TableRow key={ index }>
                            <TableCell align="left">{ row.zone }</TableCell>
                            <TableCell align="left">{ row.reader }</TableCell>
                            <TableCell align="left">{ row.ip }</TableCell>
                            <TableCell align="right">
                              <Switch id="reader-status-switch" edge="end" onChange={(e)=>handleToggle(e, row.id, row.authorised)} checked={row.authorised} />
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}