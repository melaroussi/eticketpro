"use client"
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { AlertTitle, Grid, Paper, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Container  from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment"
import ButtonGroup from "@mui/material/ButtonGroup"
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';

/** Colors imports */
import { green, pink, blue, grey, purple } from "@mui/material/colors";

// Icons Import
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StyleIcon from "@mui/icons-material/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import RssFeedIcon from '@mui/icons-material/RssFeed';

/** Components imports */

import { useRouter } from "next/navigation"
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import NavigationSystem from "../../components/NavigationSystem";
import { Chair, ListAltOutlined, NumbersOutlined } from "@mui/icons-material";
import { Joan } from "next/font/google";


const moment = require("moment"); 


const TABLE_ROWS_PER_PAGE = 2

export default function Dashboard(props) {

  const router = useRouter()

  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)

  /** Ticket List */
  let [tickets, setTickets] = React.useState([])

  /** Canvas Infos */
  let [canvasId, setCanvasId] = React.useState()
  let [xPositionsNumber, setXPositionsNumber] = React.useState()
  let [yPositionsNumber, setYPositionsNumber] = React.useState()  
  let [positions, setPositions] = React.useState([])

  /** KPIs */
  let [totalNumberOfSits, setTotalNumberOfSits] = React.useState()
  let [totalNumberOfAvailableSits, setTotalNumberOfAvailableSits] = React.useState()
  let [totalNumberOfSoltSits, setTotalNumberOfSoltSits] = React.useState()

  /** Selected Category */
  let [category, setCategory] = React.useState()

  /** Selected Item */
  let [selectedItem, setSelectedItem] = React.useState({
    ticketId: null,
    positionId: null,
    validityStartDatetime : moment().format("YYYY-MM-DD").toString(),
    validityStopDatetime : moment().format("YYYY-MM-DD").toString(),
    allowedScanNumber: 1,
    paiementType: null,
    userId: onlineUser?.id,
    clientId: null
  })

  /** Handlers */
  const handlePaiementType = function(event, value){
    event.preventDefault()
    selectedItem.paiementType = value
  }

  const handleValidityStartDatetime = function(event, ticketId){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === ticketId){
        item.validityStartDatetime = event.target.value
        /** Auto-refresh */
        router.refresh()
      }
    })
  }

  const handleValidityStopDatetime = function(event, ticketId){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === ticketId){
        item.validityStopDatetime = event.target.value
        /** Auto-refresh */
        router.refresh()
      }
    })
  }

  const handleAllowedScanNumber = function(event, ticketId){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === ticketId){
        item.allowedScanNumber = event.target.value
        /** Auto-refresh */
        router.refresh()
      }
    })
  }
  
  /** Add to Cart */
  const addToCart = function(event, element){
    event.preventDefault()

    /** Check If Item In */
    selectedItem.positionId = element?.id
    selectedItem.validityStartDatetime = moment().format("YYYY-MM-DD").toString()
    selectedItem.validityStopDatetime = moment().format("YYYY-MM-DD").toString()
    selectedItem.userId = onlineUser?.id,
    selectedItem.clientId = null
   
    /** Refresh the page */
    router.refresh()  
  }

  /** Update Paiement Chanel Number */
  const updatePaiementType = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        item.paiementType = event.target.value
        /** Page Refresh */
        router.refresh()
      }
    })
  }

  /** Check If Already Added In Cart */
  const isAlreadyAdded = function(id){
    let added = false;
    
    cart.forEach(function(item){
      if (item.ticketId === id) added=true
    })
    
    return added
  }

  /** Handlers */
  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  const init = async function(){
    const OPTIONS = {
      method: "GET", 
    }
 
    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets"), OPTIONS).then(function(response){
 
      response.json().then(function(data){
        let list = data.result
        /** Loading Data */
        setTickets(list?.filter(function(item){
          /** Load only Graphical Tickets */
          return (item.forGraphicalSell === 1)
        }))
      })
    })
  }

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    /** First List Init */
    init()
    
  }, [tickets])

  /** Save Transaction */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (false){
      setValidationAlert(true)
    }
    else{
      const OPTIONS = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem)
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells?operation=graphical-sell"), OPTIONS).then(function(response){
        router.replace('/application/cashier/graphics')
      })
    }
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  /** Filter loadCanevas by Categories */
  const loadCanevas = function(event, item){
    event.preventDefault()
    /** Update Category for Button Color */
    selectedItem.ticketId = item.id
    selectedItem.positionId = null
    /** Load Canvas and Positions Infos */
    const OPTIONS = {
      method: "GET", 
    }
    /** Getting Canvas Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=get-canvas&id=").concat(item.id), OPTIONS).then(function(response){
      response.json().then(function(data){
        setCanvasId(data.result[0]?.id)
        setXPositionsNumber(data.result[0]?.xPositionsNumber)
        setYPositionsNumber(data.result[0]?.yPositionsNumber)
      })
    })
  }

  React.useEffect(function(){
    /** Update KPIs */
    setTotalNumberOfSoltSits(positions.filter(function(item){
      return item.isSold === 1 && item.isActive === 1
    }).length)

    setTotalNumberOfAvailableSits(positions.filter(function(item){
      return item.isSold === 0 && item.isActive === 1
    }).length)

    setTotalNumberOfSits(positions.filter(function(item){
      return item.isActive === 1
    }).length)
  }, [positions])

  React.useEffect(function(){
    /** Load Canvas and Positions Infos */
    const OPTIONS = {
      method: "GET", 
    }
    /** Loading Positions Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/canvas?operation=get-positions&id=").concat(canvasId), OPTIONS).then(function(response){
      response.json().then(function(data){
        setPositions(data.result)
      })
    })
  }, [canvasId])

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  return (
    <>
      {/** */}
      <Grid container flexDirection="row" justifyContent="start" alignItems="start" sx={{ width:"100%", height:"100vh", backgroundColor: grey[50]}}>
        { /** AppBar */}
        <Grid item xs={12} sm={12}>
          <NavigationSystem indicator={"tickets"} element={"Espace Billeterie"}/>
        </Grid>
        { /** Category Buttons */}
        <Grid item xs={12} sm={12} sx={{paddingTop: 10}}>
          <Container maxWidth="xl">
            <Grid container gap={1}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6">
                  Choisissez une categorie pour visualiser le canevas graphique
                </Typography>
                <Stack direction={"row"} component={Paper} spacing={2} sx={{padding: 1, overflow: "hidden", overflowX: "scroll", scrollbarWidth:"none"}}>
                  {
                    tickets.map(function(item){
                      return(
                        <Button key={item.id} onClick={(e)=>loadCanevas(e, item)} variant={"contained"} color={item.category === category ? "primary" : "inherit"} sx={{minWidth: 300}}>
                          { item.category }
                        </Button>
                      )
                    })
                  }
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack direction={"row"} component={Paper} spacing={2} sx={{padding: 1, overflow: "hidden", overflowX: "scroll", scrollbarWidth:"none"}}>
                  <Button fullWidth onClick={(e)=>handlePaiementType(e, "ESPECE")} variant="contained" color={selectedItem.paiementType === "ESPECE" ? "primary" : "inherit"}>ESPECE</Button>
                  <Button fullWidth onClick={(e)=>handlePaiementType(e, "TPE")} variant="contained"  color={selectedItem.paiementType === "TPE" ? "primary" : "inherit"}>TPE</Button>
                  <Button fullWidth onClick={(e)=>handlePaiementType(e, "CHEQUE")} variant="contained" color={selectedItem.paiementType === "CHEQUE" ? "primary" : "inherit"}>CHEQUE</Button>
                  <Button fullWidth onClick={(e)=>handlePaiementType(e, "WEB")} variant="contained" color={selectedItem.paiementType === "WEB" ? "primary" : "inherit"}>WEB</Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction={"row"} alignItems={"center"} padding={1} component={Paper} spacing={2} >
                  <Avatar variant="rounded" sx={{backgroundColor: green[500]}}>
                    { totalNumberOfSits }
                  </Avatar>
                  <Typography variant="body1">
                    Nombre Total de Places
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction={"row"} alignItems={"center"} padding={1} component={Paper} spacing={2} >
                  <Avatar variant="rounded" sx={{backgroundColor: blue[500]}}>
                  { totalNumberOfAvailableSits }
                  </Avatar>
                  <Typography variant="body1">
                    Nombre Places Disponibles
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction={"row"} alignItems={"center"} padding={1} component={Paper} spacing={2} >
                  <Avatar variant="rounded" sx={{backgroundColor: purple[500]}}>
                    { totalNumberOfSoltSits }
                  </Avatar>
                  <Typography variant="body1">
                    Nombre de Places Vendus
                  </Typography>
                </Stack>
              </Grid>
              {/** Canvas Buttons */}
              <Grid item xs={12} sm={12}>
                <Paper sx={{ padding: 2 }}>
                  <Stack direction={"row"} spacing={2} sx={{overflow: "hidden", overflowY: "scroll", scrollbarWidth:"none"}}>
                    <Grid container rowSpacing={1} columnSpacing={1} columns={xPositionsNumber}>
                      {
                        positions.map(function(item, index){
                          return(
                            <Grid item xs={1} key={index} justifyItems={"center"}>
                              <Paper sx={{padding: 1, visibility: (item.isActive) ? 'visible' : 'hidden', backgroundColor: (selectedItem.positionId === item.id) ? grey[200] : null }}>
                                <Stack direction={"row"}>
                                  <IconButton disabled={item.isSold} onClick={(e)=>addToCart(e, item)}>
                                    <Avatar variant={"circular"} sx={{backgroundColor: (item.isSold) ? grey[600] : item.color }}>
                                      <Chair sx={{color: grey[50]}}/>
                                    </Avatar>
                                  </IconButton>
                                  <Stack direction={"column"}>
                                    <Typography variant="button">
                                      {item.positionCode}
                                    </Typography>
                                    <Typography variant="body2">
                                      {item.price} DH
                                    </Typography>
                                    <Typography variant="body2">
                                      {(item.isSold) ? "Vendu" : "Dispo"}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Paper>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Stack>
                </Paper>
              </Grid>
              {/** Canvas Buttons */}
              <Grid item xs={12} sm={12} height={"10vh"}>
                <Paper sx={{padding: 2}}>
                  {/** Validation Buttons */}
                  <Stack direction={"row"} spacing={2}>
                    <Button onClick={(e)=>handleLinks(e, "cashier/graphics")} variant="contained" color="inherit" fullWidth>
                      Annuler
                    </Button>
                    <Button onClick={save} disabled={(selectedItem?.positionId === null) || (selectedItem?.paiementType === null)} variant="contained" color="primary" fullWidth>
                      Valider le Panier
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
