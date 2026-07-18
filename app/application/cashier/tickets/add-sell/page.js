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
import { green, pink, blue, grey } from "@mui/material/colors";

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
import { parseString } from "xml2js";


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

  /** Cart */
  let [cart, setCart] = React.useState([])
  /** Ticket List */
  let [tickets, setTickets] = React.useState([])
  /** Filtered Ticket List */
  let [filteredTickets, setFilteredTickets] = React.useState([])
  /** Selected Ticket Page */
  let [selectedTicketsPage, setSelectedTicketsPage] = React.useState(0)
  /** All Categories */
  let [categories, setCategories] = React.useState([])
  /** Selected Category */
  let [category, setCategory] = React.useState()
  /** Quota Infos */
  let [quotaInfos, setQuotaInfos] = React.useState([])
  
  /** Handlers */
  const handlePageChange = function(event, page){
    event.preventDefault()
    setSelectedTicketsPage(page)
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
    let exists = false
    cart.forEach(function(item){
      if (item.id === element.id){
        item.quantity++
        exists = true
      }
    })
    if (!exists){
      cart.push({
        ticketId: element.id,
        category: element.category,
        type: element.type,
        price: element.price,
        quantity: 1,
        validityStartDatetime : moment().format("YYYY-MM-DD").toString(),
        validityStopDatetime : moment().format("YYYY-MM-DD").toString(),
        allowedScanNumber: parseInt(element.allowedScanNumber) || 1,
        onTimeDefinitionAllowedScanNumber: element.onTimeDefinitionAllowedScanNumber,
        paiementType: "ESPECE",
        userId: onlineUser.id,
        clientId: null
      })
      /** Refresh the page */
      router.refresh()
    }    
  }

  /** Add From Cart */
  const plusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        item.quantity++
        /** Page Refresh */
        router.refresh()
      }
    })
  }

  /** Remove From Cart */
  const minusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        item.quantity--
        /** Check if It Was the last */
        if (item.quantity == 0){
          // Remove Element with Filtering
          setCart(cart.filter((element)=> element.ticketId != item.ticketId))
        }
        /** Page Refresh */
        router.refresh()
      }
    })
  }

   /** Increase Scan Number */
   const increaseScanNumber = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        item.allowedScanNumber++
        /** Page Refresh */
        router.refresh()
      }
    })
  }

  /** Decrease Scan Number */
  const decreaseScanNumber = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        if (item.allowedScanNumber > 1){
          item.allowedScanNumber--
        }
        /** Page Refresh */
        router.refresh()
      }
    })
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

  const isAssigned = function(id){
    let assigned = false;
    if (!Array.isArray(quotaInfos)) return false;
    quotaInfos.forEach(function(item){
      if (item.ticketId === id && item.assigned === 1) assigned=true
    })
    
    return assigned
  }

  const getQuotaInfos = function(id){
    if (!Array.isArray(quotaInfos)) return null;
    let results = quotaInfos.filter(function(item){
      return (item.ticketId === id && item.assigned === 1)
    })
    
    return results.length > 0 ? results[0] : null;
  }

  /** Handlers */
  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  const init = async function(){
    const OPTIONS = {
      method: "GET", 
    }
 
    setCategories([])
    /** Getting Categories */
    fetch(process.env.API_USER_ENDPOINT.concat("/categories"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        setCategories(list?.map(function(item){
          return item.label
        }))
      })
    })
    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets"), OPTIONS).then(function(response){
 
      response.json().then(function(data){
        let list = data.result

        /** Loading Data */
        list.forEach(function(item){
          tickets.push({
            id: item.id,
            category: item.category,
            type: item.type,
            price: item.price,
            needReservation: item.needReservation,
            minimumOrders: item.minimumOrders,
            allowedScanNumber: item.allowedScanNumber,
            onTimeDefinitionAllowedScanNumber: item.onTimeDefinitionAllowedScanNumber,
            NFCIdentifyer: item.NFCIdentifyer,
            description: item.description
          })
        })
      })
    })
  }

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    /** First List Init */
    init()
  }, [])

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
        body: JSON.stringify(cart)
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells?operation=sell"), OPTIONS).then(function(response){
        router.replace('/application/cashier/tickets')
      })
    }
  }

  const getTicketQuotaInfos = async function(){
    /** Save endpoint call */
    const OPTIONS = {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: onlineUser?.id
      })
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/quota?operation=get-quota-infos"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setQuotaInfos(data.result)
      })
    })
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  /** Filter Tickets by Categories */
  const filterByCategory = async function(event, category){
    event.preventDefault()
    /** Update Category for Button Color */
    setCategory(category)
    /** Filter Array */
    setFilteredTickets(    
      tickets.filter(function(ticket){
        return ticket.category === category
      })
    )
    /** Getting Quota Infos */
    await getTicketQuotaInfos()
    /** Page Refresh */
    router.refresh()
  }

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  return (
    <>
      {/** */}
      <Grid container position={"fixed"} flexDirection="row" justifyContent="start" alignItems="start" sx={{ width:"100%", height:"100vh", backgroundColor: grey[50]}}>
        { /** AppBar */}
        <Grid item xs={12} sm={12} height={"5vh"}>
          <NavigationSystem indicator={"tickets"} element={"Espace Billeterie"}/>
        </Grid>
        { /** Category Buttons */}
        <Grid item xs={12} sm={12} height={"40vh"}>
          <Container maxWidth="xl">
            <Stack direction={"column"} spacing={2}>
              <Stack direction={"column"} spacing={0}>
                <Typography variant="h6">
                  Choisissez une categorie pour visualiser ces tickets
                </Typography>
              </Stack>
              <Stack direction={"row"} component={Paper} spacing={2} sx={{padding: 1, overflow: "hidden", overflowX: "scroll", scrollbarWidth:"none"}}>
                {
                  categories.map(function(item){
                    return(
                      <Button key={item} onClick={(e)=>filterByCategory(e, item)} variant={"contained"} color={item === category ? "primary" : "inherit"} sx={{minWidth: 300}}>
                        { item }
                      </Button>
                    )
                  })
                }
              </Stack>
              <Stack direction={"row"} spacing={2} sx={{padding: 1, overflow: "hidden", overflowX: "scroll", scrollbarWidth:"none"}}>
                {
                  filteredTickets && filteredTickets.map(function(item){
                    let ticketQuotaInfos = getQuotaInfos(item.id)
                    return(
                      <Card key={item.id} sx={{ minWidth: 300, maxWidth: 300, minHeight:100 }}> 
                        <CardHeader avatar={<Avatar variant="rounded" sx={{backgroundColor: green[500]}}>{ item.NFCIdentifyer ? <RssFeedIcon/> : <QrCode2Icon/> }</Avatar>} title={item.type} subheader={<Typography variant="button">{item.price} {"DH"}</Typography>}/>
                        <CardContent>
                        {
                          ticketQuotaInfos && <Typography variant="body2">
                            Quota : { (ticketQuotaInfos.illimited === 1) ? "Illimité" : String(ticketQuotaInfos.quota).concat(" - Ventes : ").concat(String(ticketQuotaInfos.sellsNumber))}
                          </Typography>
                        }
                        </CardContent>
                        <CardActions disableSpacing disableGutters>
                          <Button onClick={(e)=>addToCart(e, item)} disabled={isAlreadyAdded(item.id) || (!isAssigned(item.id)) || (ticketQuotaInfos && ticketQuotaInfos.illimited === 0 && (ticketQuotaInfos.quota <= ticketQuotaInfos.sellsNumber))} variant={"contained"} color={"inherit"} fullWidth>
                            Ajouter 
                          </Button>
                        </CardActions>
                      </Card>
                    )
                  })
                }
              </Stack>
            </Stack>
          </Container>
        </Grid>

        { /** Filtered Tickets Table */}
        <Grid item xs={12} sm={12} height={"30vh"}>
          <Container maxWidth="xl">
            <Typography variant="h6">
              Panier
            </Typography>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ margin: 3}}>
                    <TableCell align="left">Billet</TableCell>
                    <TableCell align="left">Prix</TableCell>
                    <TableCell align="left">Scans</TableCell>
                    <TableCell align="left">
                    
                    </TableCell>
                    <TableCell align="left">Date A</TableCell>
                    <TableCell align="left">Date B</TableCell>
                    <TableCell align="left">Paiement</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="right">

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    cart && cart.map(function(row, index){
                      if (index >= selectedTicketsPage*TABLE_ROWS_PER_PAGE && index <= (selectedTicketsPage+1)*TABLE_ROWS_PER_PAGE-1){
                        return(
                          <TableRow key={ row.id }>
                            <TableCell align="left" sx={{width: 200}}>
                              <Typography variant="body1"> { row.type } </Typography>
                              <Typography variant="body2"> { row.category } </Typography> 
                            </TableCell>
                            <TableCell align="left">{ row.price }</TableCell>
                            <TableCell align="left">{ row.allowedScanNumber }</TableCell>
                            <TableCell align="right">
                              <ButtonGroup disabled={row.onTimeDefinitionAllowedScanNumber === "Non"} variant="contained">
                                <Button onClick={(e)=>decreaseScanNumber(e, row.ticketId)}>
                                  <RemoveCircleIcon/>
                                </Button>
                                <Button onClick={(e)=>increaseScanNumber(e, row.ticketId)}>
                                  <AddCircleIcon/>
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                            <TableCell align="center" sx={{width: 100}}>
                              <TextField value={row.validityStartDatetime} onChange={(e)=>handleValidityStartDatetime(e, row.ticketId)} variant="outlined" type="date" size="small" required fullWidth InputLabelProps={{ shrink: true }}/>
                            </TableCell>
                            <TableCell align="center" sx={{width: 200}}>
                              <TextField value={row.validityStopDatetime} onChange={(e)=>handleValidityStopDatetime(e, row.ticketId)} variant="outlined" type="date" size="small" required fullWidth InputLabelProps={{ shrink: true }}/>
                            </TableCell>
                            <TableCell align="center" sx={{width: 100}}>
                              <TextField value={row.paiementType} defaultValue={row.paiementType} onChange={(e)=>updatePaiementType(e, row.ticketId)} variant='outlined' size='small'  required InputLabelProps={{ shrink: true }} select>
                                <MenuItem value={"ESPECE"}>ESPECE</MenuItem>
                                <MenuItem value={"CHEQUE"}>CHEQUE</MenuItem>
                                <MenuItem value={"TPE"}>TPE</MenuItem>
                                <MenuItem value={"WEB"}>WEB</MenuItem>
                              </TextField>
                            </TableCell>
                            <TableCell align="left">{ row.quantity }</TableCell>
                            <TableCell align="right">
                              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={(e)=>minusOne(e, row.ticketId)}>
                                  <RemoveCircleIcon/>
                                </Button>
                                <Button onClick={(e)=>plusOne(e, row.ticketId)}>
                                  <AddCircleIcon/>
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    })
                  }
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[TABLE_ROWS_PER_PAGE]}
                count={cart.length}
                component={'div'}
                rowsPerPage={TABLE_ROWS_PER_PAGE}
                page={selectedTicketsPage}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Container>
        </Grid>

        { /** Bottom Navigation */}
        <Grid item xs={12} sm={12} height={"5vh"}>
          <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 40, paddingY: 1 }}>
            <Container maxWidth="xl">
              <Stack direction={"row"} spacing={2}>
                <Button onClick={(e)=>handleLinks(e, "cashier/tickets")} variant="contained" color="inherit" fullWidth>
                  Annuler
                </Button>
                <Button onClick={save} disabled={cart.length === 0} variant="contained" color="primary" fullWidth>
                  Valider le Panier
                </Button>
              </Stack>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
