"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Switch  from '@mui/material/Switch';
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
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { green, pink } from '@mui/material/colors';

import NavigationSystem from '../components/NavigationSystem';

import { useRouter } from 'next/navigation'
 


const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()

  let [printables, setPrintables] = React.useState([])

  let [loading, setLoading] = React.useState(true)
  
  /** Load DB */
  const load = function(event, id){
    const OPTIONS = {
      method: "GET", 
    }
    setPrintables([])
    fetch(process.env.API_USER_ENDPOINT.concat("/printables?operation=get-all"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setPrintables(list)
        setLoading(false)
      })
    })
  }

  /** UseEffect */
  React.useEffect(function(){
    load()
  }, [])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/manager/printables/create')
  }

  const loadUpdatePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/printables/update?id=".concat(id))
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/printables/delete?id=".concat(id))
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
      }
    }

    fetch(process.env.API_USER_ENDPOINT.concat("/printables?operation=activate&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"printables"} element={"Gestion des Modèles de Tickets"}/>

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
                    <TableCell align="left">Taille</TableCell>
                    <TableCell align="left">Largeur</TableCell>
                    <TableCell align="left">Hauteur</TableCell>
                    <TableCell align="left">Orientation</TableCell>
                    <TableCell align="left">eAX</TableCell>
                    <TableCell align="left">eAY</TableCell>
                    <TableCell align="left">eBX</TableCell>
                    <TableCell align="left">eBY</TableCell>
                    <TableCell align="left">eCX</TableCell>
                    <TableCell align="left">eCY</TableCell>
                    <TableCell align="left">eDX</TableCell>
                    <TableCell align="left">eDY</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouveau
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    printables && printables.map(function(row){
                      return(
                        <TableRow key={ row.id }>
                          <TableCell align="left">{ row.size }</TableCell>
                          <TableCell align="left">{ row.width }</TableCell>
                          <TableCell align="left">{ row.height }</TableCell>
                          <TableCell align="left">{ row.orientation }</TableCell>
                          <TableCell align="left">{ row.elementAX }</TableCell>
                          <TableCell align="left">{ row.elementAY }</TableCell>
                          <TableCell align="left">{ row.elementBX }</TableCell>
                          <TableCell align="left">{ row.elementBY }</TableCell>
                          <TableCell align="left">{ row.elementCX }</TableCell>
                          <TableCell align="left">{ row.elementCY }</TableCell>
                          <TableCell align="left">{ row.elementDX }</TableCell>
                          <TableCell align="left">{ row.elementDY }</TableCell>
                          <TableCell align="right">
                            <Switch edge="end" onChange={(e)=>handleToggle(e, row.id, row.status)} checked={row.status} />
                            <IconButton color="primary" onClick={(e)=>loadDeletePage(e, row.id)}>
                              <DeleteOutlineIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={(e)=>loadUpdatePage(e, row.id)}>
                              <EditNoteIcon/>
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