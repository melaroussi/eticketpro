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
import NavigationSystem from '../components/NavigationSystem';

import { useRouter } from 'next/navigation'
 

const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()

  let [users, setUsers] = React.useState([])
  let [loading, setLoading] = React.useState(true)
  
  /** Card KPIs */
  let [usersNumber, setUsersNumber] = React.useState(0)
  let [permanantServiceUsersNumber, setPermanantServiceUsersNumber] = React.useState(0)
  let [organizersUsersNumber, setOrganizersUsersNumber] = React.useState(0)
  let [inactiveUsersNumber, setInactiveUsersNumber] = React.useState(0)
    
  /** UseEffect */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    setUsers([])
    fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=get-all"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setUsers(list)
        /** KPIs */
        setPermanantServiceUsersNumber(list.filter((item) => item.type === "Service Permanant").length)
        setOrganizersUsersNumber(list.filter((item) => item.type === "Organisateur").length)
        setInactiveUsersNumber(list.filter((item) => item.status === "Inactif").length)
        setUsersNumber(list.length)
        /** Loading flag */
        setLoading(false)
      })
    })
  }, [])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/manager/users/create')
  }

  const loadUpdatePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/users/update?id=".concat(id))
  }

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/users/read?id=".concat(id))
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/users/delete?id=".concat(id))
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
        <Grid container  spacing={2}>
          {/** Charts and KPIs */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Utilisateurs
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre d'utilisateurs inscrits dans la base de données E-TICKET PRO
                </Typography>
                <Typography variant='h5' align='center'>
                  { usersNumber}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** Charts and KPIs */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Service Permanant
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre d'utilisateurs du service permanant inscrites sur E-TICKET PRO
                </Typography>
                <Typography variant='h5' align='center'>
                  { permanantServiceUsersNumber }
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** Charts and KPIs */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Organisateurs
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre d'utilisateurs organisateurs externes inscrits sur E-TICKET PRO
                </Typography>
                <Typography variant='h5' align='center'>
                  { organizersUsersNumber }
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** Charts and KPIs */}
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Utilisateurs Inctifs
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre d'utilisateurs inactifs inscrits dans la base de données E-TICKET PRO
                </Typography>
                <Typography variant='h5' align='center'>
                  { inactiveUsersNumber }
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** Actions Bar */}
          <Grid item xs={12} sm={12}>

          </Grid>
          {/** Data Table*/}
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nom</TableCell>
                    <TableCell align="left">Prénom</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Département</TableCell>
                    <TableCell align="left">Profile</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouveau
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    users.map(function(row){
                      return(
                        <TableRow key={ row.id }>
                          <TableCell align="left">{ row.firstName }</TableCell>
                          <TableCell align="left">{ row.lastName }</TableCell>
                          <TableCell align="left">{ row.email }</TableCell>
                          <TableCell align="left">{ row.department }</TableCell>
                          <TableCell align="left">{ getProfileLabel(row.profile) }</TableCell>
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