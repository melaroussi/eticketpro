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
import { Avatar, ButtonGroup, Chip, Grid, Stack, TextField } from '@mui/material';
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
import { Chair, CheckBox, RemoveCircle } from '@mui/icons-material';
import { blue, green, grey } from '@mui/material/colors';



const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  let [canvasId, setCanvasId] = React.useState()
  let [xPositionsNumber, setXPositionsNumber] = React.useState(2)
  let [yPositionsNumber, setYPositionsNumber] = React.useState(3)
  let [colorsNumber, setColorsNumber] = React.useState(3)
  let [label, setLabel] = React.useState()

  let [color, setColor] = React.useState()
  let [price, setPrice] = React.useState()
  
  let [positions, setPositions] = React.useState([])
  
  /** Handlers */
  const handleColor = function(event){
    setColor(event.target.value)
  }

  const handlePrice = function(event){
    setPrice(event.target.value)
  }

  const handleXPositionsNumber = function(event){
    setXPositionsNumber(event.target.value)
  }

  const handleYPositionsNumber = function(event){
    setYPositionsNumber(event.target.value)
  }

  const handleColorsNumber = function(event){
    setColorsNumber(event.target.value)
  }

  const handleLabel = function(event){
    setLabel(event.target.value)
  }

  /** UseEffect */
  React.useEffect(function(){
    load()
  }, [canvasId])
  
  const load = function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Getting Canvas Infos */
    let id = searchParams.get("id")
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=get-canvas&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        setCanvasId(data.result[0]?.id)
        setXPositionsNumber(data.result[0]?.xPositionsNumber)
        setYPositionsNumber(data.result[0]?.yPositionsNumber)
        setColorsNumber(data.result[0]?.colorsNumber)
        setLabel(data.result[0]?.label)
      })
    })
    /** Loading Positions Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=get-positions&id=").concat(canvasId), OPTIONS).then(function(response){
      response.json().then(function(data){
        setPositions(data.result)
      })
    })
  }

  const updatePositionColor = function(event, id){
    /** Calling API */
    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: color,
        price: price
      })
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=update-position-color&id=").concat(id), OPTIONS).then(function(response){
      load()
    })
  }

  const loadCanvasPage = function(event){
    event.preventDefault()
    let id = searchParams.get("id")
    router.push("/application/manager/tickets/canvas?id=".concat(id))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"tickets"} element={"Gestion des Tickets"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** Canvas Params */}
          <Grid item xs={12} sm={12}>
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="h6">
                    Parametrage des Couleurs du Ticket à Vente Graphique {color}{price}
                  </Typography>
                  <Typography variant="body1">
                    Merci de selectionner la couleurs, spécifier le prix puis cliquez sur chaque siège qui aura la couleur spécifiée. 
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <TextField value={color} onChange={handleColor} variant='outlined' size='small' type="color" label="Couleur du Siège" required fullWidth InputLabelProps={{ shrink: true }} />
                  <TextField value={price} defaultValue={40} onChange={handlePrice} variant='outlined' size='small' type="number" label="Prix en DH (TTC)" required fullWidth InputLabelProps={{ shrink: true }} />
                </Stack>    
              </Stack>
            </Paper>
          </Grid>
          {/** Canvas Buttons */}
          <Grid item xs={12} sm={12}>
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                  <Grid container rowSpacing={1} columnSpacing={1} columns={xPositionsNumber}>
                  {
                    positions.map(function(item, index){
                      return(
                        <Grid item xs={1} key={index}>
                          <IconButton disabled={item.isSold} onClick={(e)=>updatePositionColor(e, item.id)}>
                            <Avatar variant={"circular"} sx={{visibility: (item.isActive) ? 'visible' : 'hidden', backgroundColor: (item.color) ? item.color : grey[600]}}>
                              <Chair sx={{color: grey[50]}}/>
                            </Avatar>
                          </IconButton>
                        </Grid>
                      )
                    })
                  }
                  </Grid>
                </Stack>
                <Button variant="contained" onClick={(e)=>loadCanvasPage(e)}>Revenir</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}