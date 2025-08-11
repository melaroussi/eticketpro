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
import { Alert, AlertTitle, Avatar, ButtonGroup, Chip, Collapse, Grid, Stack, TextField } from '@mui/material';
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
import { Chair, CheckBox, Close, RemoveCircle } from '@mui/icons-material';
import { blue, green, grey } from '@mui/material/colors';



const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  let [canvasId, setCanvasId] = React.useState()
  let [xPositionsNumber, setXPositionsNumber] = React.useState()
  let [yPositionsNumber, setYPositionsNumber] = React.useState()
  
  let [positions, setPositions] = React.useState([])
  
  /** Handlers */
  const handleXPositionsNumber = function(event){
    setXPositionsNumber(event.target.value)
  }

  const handleYPositionsNumber = function(event){
    setYPositionsNumber(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
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
      })
    })
    /** Loading Positions Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=get-positions&id=").concat(canvasId), OPTIONS).then(function(response){
      response.json().then(function(data){
        setPositions(data.result)
      })
    })
  }

  const initCanvas = function(event){
    event.preventDefault()

    /** Save Ticket positions */
    let newPositionsArray = []
    if (xPositionsNumber && yPositionsNumber){
      for (let line=1; line<=yPositionsNumber; line++){
        for (let column=1; column<=xPositionsNumber; column++){
          newPositionsArray.push({
            "canvasId": null,
            "lineIndex": line,
            "columnIndex": column,
            "isActive": true,
            "isSold": false,
            "positionCode": "S".concat(line).concat(".").concat(column),
            "price": null
          })
        }        
      }
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
          canvasId: canvasId,
          xPositionsNumber: xPositionsNumber,
          yPositionsNumber: yPositionsNumber,
          positions: newPositionsArray
        })
      }
      let ticketId = searchParams.get("id")
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=init-canvas&ticketId=").concat(ticketId), OPTIONS).then(function(response){
        load()
      })
    }
    else{
      setValidationAlert(true)
    }
  }

  const updatePositionStatus = function(event, position){
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
        isActive: (position.isActive ===1)? 0 : 1
      })
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=update-position-status&id=").concat(position.id), OPTIONS).then(function(response){
      load()
    })
  }

  const loadColorsPage = function(event){
    event.preventDefault()
    let id = searchParams.get("id")
    router.push("/application/manager/tickets/canvas/colors?id=".concat(id))
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
                    Parametrage du Ticket à Vente Graphique
                  </Typography>
                  <Typography variant="body1">
                    Nombre de Places : {xPositionsNumber*yPositionsNumber} Places.
                  </Typography>
                  <Collapse in={validationAlert}>
                    <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleValidationAlert}> <Close fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                      <AlertTitle>Validation </AlertTitle>
                      Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                    </Alert>
                  </Collapse>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <TextField value={xPositionsNumber} onChange={handleXPositionsNumber} variant='outlined' size='small' type="number" label="Nombre de Positions (Horizontale)" required fullWidth InputLabelProps={{ shrink: true }} />
                  <TextField value={yPositionsNumber} onChange={handleYPositionsNumber} variant='outlined' size='small' type="number" label="Nombre de Positions (Vartical)" required fullWidth InputLabelProps={{ shrink: true }} />
                </Stack>    
                <Button variant="contained" onClick={initCanvas}>Initialiser le Canvas</Button>
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
                          <IconButton onClick={(e)=>updatePositionStatus(e, item)}>
                            <Avatar variant={"circular"} sx={{backgroundColor: (item.isActive) ? green[500] : grey[500]}}>
                              <Chair sx={{color: grey[50]}}/>
                            </Avatar>
                          </IconButton>
                        </Grid>
                      )
                    })
                  }
                  </Grid>
                </Stack>
                { (positions.length != 0) && <Button variant="contained" onClick={(e)=>loadColorsPage(e)}>Définir les Couleurs</Button> }
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}