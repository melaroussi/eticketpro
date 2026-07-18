"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
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

// Dialog imports for permissions management
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ListSubheader from '@mui/material/ListSubheader';

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

  // Permissions Dialog States
  const [permissionsOpen, setPermissionsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedModules, setSelectedModules] = React.useState({
    zones_readers: false,
    organisation: false,
    categories_printables: false,
    tickets: false,
    stock: false
  });
    
  /** Fetch users */
  const fetchUsers = () => {
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
  };

  React.useEffect(function(){
    fetchUsers();
  }, [])

  const loadCreatePage = function(event){
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

  // Handle open permissions dialog
  const handleOpenPermissions = (event, user) => {
    event.preventDefault();
    setSelectedUser(user);
    let allowed = [];
    try {
      if (user.allowedModules) {
        allowed = JSON.parse(user.allowedModules);
      }
    } catch(e) {}
    
    setSelectedModules({
      zones_readers: allowed.includes("zones_readers"),
      organisation: allowed.includes("organisation"),
      categories_printables: allowed.includes("categories_printables"),
      tickets: allowed.includes("tickets"),
      stock: allowed.includes("stock")
    });
    setPermissionsOpen(true);
  };

  const handleToggleModule = (moduleKey) => {
    setSelectedModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const handleSavePermissions = () => {
    const modulesToSave = Object.keys(selectedModules).filter(key => selectedModules[key]);
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        allowedModules: JSON.stringify(modulesToSave)
      })
    };
    
    fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=update-permissions&id=").concat(selectedUser.id), OPTIONS)
      .then(response => {
        if (response.ok) {
          // Refresh list to keep state updated
          fetchUsers();
          setPermissionsOpen(false);
        }
      });
  };

  /** Get Profile Label */
  const getProfileLabel = function(constant){
    if (constant === "admin") return "Administrateur"
    else if (constant === "cashier") return "Caissier"
    else if (constant === "chief-cashier") return "Chef de Caisse"
    else if (constant === "parking-cashier") return "Agent de Parking"
    else if (constant === "shop-cashier") return "Caissier de Boutique"
    else return constant;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"users"} element={"Gestion des Utilisateurs"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container spacing={2}>
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
                  Utilisateurs Inactifs
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
                            {row.profile === 'admin' && (
                              <IconButton 
                                color="secondary" 
                                title="Droits d'accès par module"
                                onClick={(e)=>handleOpenPermissions(e, row)}
                              >
                                <AdminPanelSettingsIcon/>
                              </IconButton>
                            )}
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

      {/* Permissions Management Dialog */}
      <Dialog 
        open={permissionsOpen} 
        onClose={() => setPermissionsOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          Droits d'Accès par Module
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
                Utilisateur : {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Email : {selectedUser.email}
              </Typography>
            </Box>
          )}
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }} color="text.secondary">
            Cochez les modules de l'application que cet administrateur est autorisé à utiliser :
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selectedModules.zones_readers} 
                  onChange={() => handleToggleModule("zones_readers")} 
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Zones & Lecteurs</Typography>
                  <Typography variant="caption" color="text.secondary">Configuration physique du Zoo et lecteurs NFC</Typography>
                </Box>
              }
              sx={{ mb: 1.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selectedModules.organisation} 
                  onChange={() => handleToggleModule("organisation")} 
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Gestion Organisation</Typography>
                  <Typography variant="caption" color="text.secondary">Départements, Comptes Utilisateurs, et SMTP</Typography>
                </Box>
              }
              sx={{ mb: 1.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selectedModules.categories_printables} 
                  onChange={() => handleToggleModule("categories_printables")} 
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Catégories & Impression</Typography>
                  <Typography variant="caption" color="text.secondary">Catégories de tickets et formats d'impression</Typography>
                </Box>
              }
              sx={{ mb: 1.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selectedModules.tickets} 
                  onChange={() => handleToggleModule("tickets")} 
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Billetterie & Abonnements</Typography>
                  <Typography variant="caption" color="text.secondary">Gestion tickets, abonnements Pass, scans et reporting</Typography>
                </Box>
              }
              sx={{ mb: 1.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selectedModules.stock} 
                  onChange={() => handleToggleModule("stock")} 
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Gestion de Stock</Typography>
                  <Typography variant="caption" color="text.secondary">Articles boutiques et approvisionnements</Typography>
                </Box>
              }
              sx={{ mb: 1.5 }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPermissionsOpen(false)} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleSavePermissions} variant="contained" color="primary" sx={{ fontWeight: 700 }}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}