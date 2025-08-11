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
import { ButtonGroup, Chip, Grid, Stack, TextField } from '@mui/material';
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
import NavigationSystem from '../../components/NavigationSystem';

/** Hooks import */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { RemoveCircle } from '@mui/icons-material';
import { green } from '@mui/material/colors';



const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  let [assignmentList, setAssignmentList] = React.useState([])
  let [ticket, setTicket] = React.useState()
  let [loading, setLoading] = React.useState(true)
  
  let [zoneScans, setZoneScans] = React.useState([])
  
  let [scanNumber, setScanNumber] = React.useState()

  const load = function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Loading Access List */
    setAssignmentList([])
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setAssignmentList(list)
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
  }

  /** UseEffect */
  React.useEffect(function(){
    load()
  }, [loading])
  
  const initAssignments = function(event){

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
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?operation=init-assignments&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const handleIllimited = function(event, id, status){
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
        illimited: status ? 0 : 1
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?operation=update-illimited&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const handleAssigned = function(event, id, status){
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
        assigned: status ? 0 : 1
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?operation=update-assigned&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const minusOne = function(event, id, quota){
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
        quota: ( quota > 0 ) ? quota - 1 : quota
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?operation=update-quota&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const plusOne = function(event, id, quota){
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
        quota: quota + 1
      })
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/assignments?operation=update-quota&id=").concat(id), OPTIONS).then(function(response){
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                    ticket && <TableRow>
                      <TableCell align="left">{ ticket.category }</TableCell>
                      <TableCell align="left">{ ticket.type }</TableCell>
                      <TableCell align="left">{ ticket.price }</TableCell>
                      <TableCell align="left">{ ticket.needReservation }</TableCell>
                    </TableRow>
                  }
                  </TableBody>
                </Table>
              </TableContainer>
              {/** Access List Infos */}
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Profile</TableCell>
                      <TableCell align="left">Nom</TableCell>
                      <TableCell align="left">Prénom</TableCell>
                      <TableCell align="left">Quota Illimité</TableCell>
                      <TableCell align="left">Quota</TableCell>
                      <TableCell align="left">Ajustement du Quota</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={(e)=>initAssignments(e)}>
                          Initialiser les Affectations
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      assignmentList && assignmentList.map(function(row, index){
                        return(
                          <TableRow key={ index }>
                            <TableCell align="left">{ row.profile }</TableCell>
                            <TableCell align="left">{ row.firstName }</TableCell>
                            <TableCell align="left">{ row.lastName }</TableCell>
                            <TableCell align="left">
                              <Switch title="Quota illimité ou non" onChange={(e)=>handleIllimited(e, row.id, row.illimited)} checked={row.illimited} />
                            </TableCell>
                            <TableCell align="left"> {row.quota} </TableCell>
                            <TableCell>
                              <ButtonGroup>
                                <IconButton disabled={row.illimited} onClick={(e)=>minusOne(e, row.id, row.quota)}>
                                  <RemoveCircle/>
                                </IconButton>
                                <IconButton disabled={row.illimited} onClick={(e)=>plusOne(e, row.id, row.quota)}>
                                  <AddCircleIcon/>
                                </IconButton>
                              </ButtonGroup>
                            </TableCell>
                            <TableCell align="right">
                              <Switch title="Ticket affecté ou non" edge="end" onChange={(e)=>handleAssigned(e, row.id, row.assigned)} checked={row.assigned} />
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