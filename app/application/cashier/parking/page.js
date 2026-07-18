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
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';

/** Colors imports */
import { green, pink, blue, grey } from "@mui/material/colors";

// Icons Import
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StyleIcon from "@mui/icons-material/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import PrintIcon from '@mui/icons-material/Print';
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

/** Hooks Import */
import { useRouter } from "next/navigation"
import NavigationSystem from "../components/NavigationSystem";


const moment = require("moment"); 


const TABLE_ROWS_PER_PAGE = 5

export default function Dashboard(props) {

  const router = useRouter()


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  /** Ticket List */
  let [sells, setSells] = React.useState([])
  /** Ticket Final List */
  let [list, setList] = React.useState([])
  /** Selected Ticket Page */
  let [selectedTicketsPage, setSelectedTicketsPage] = React.useState(0)
  
  /** Search Ticket ID */
  let [ticketId, setTicketId] = React.useState()
  
  /** Handlers */
  const handlePageChange = function(event, page){
    event.preventDefault()
    setSelectedTicketsPage(page)
  }

  const handleTicketId = function(event){
    setTicketId(event.target.value)
  }

  const init = async function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setSells(data.result.filter(function(item){
            return item.category && item.category.toLowerCase() === "parking" && item.printed != 1 && item.canceled != 1
          }))
        }
      })
    })
  }

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    /** First List Init */
    init()
  }, [])

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    /** First List Init */
    setList(sells)
  }, [sells])

  /** On Filter Loading UseEffect */
  React.useEffect(function(){
    /** First List Init */
    if (ticketId){
      setList(sells.filter(function(item){
        return item.id == ticketId
      }))
    }
    else{
      init()
      setList(sells)
    }
  }, [ticketId])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/cashier/parking/add-sell')
  }

  const cancelTicketSell = function(event, id){
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
    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells?operation=cancel&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        init()
      })
    })
  }
  
  const loadPrintableTicketPage = function(event, id){
    event.preventDefault()
    const OPTIONS = {
      method: "POST", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells?operation=print&id=").concat(id), OPTIONS).then(function(response){
      window.open('/application/cashier/parking/printable/ticket?id=' + id, '_blank')
      init()
    })
  }

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"parking"} element={"Espace Parking"}/>
      </Grid>
      {/** Category Buttons */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}} >
        <Container maxWidth="xl"> 
          <Stack direction={"column"} spacing={2}>
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="h6">
                    Espace Parking
                  </Typography>
                  <Typography variant="body1">
                  {
                    onlineUser && <Typography variant="body1">
                      Bonjour {onlineUser.firstName} {onlineUser.lastName}
                    </Typography>
                  }
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="h6">
                    Recherche Instantanée
                  </Typography>
                  <Typography variant="body1">
                    Tappez l'ID du ticket à rechercher pour filtrer la table.
                  </Typography>
                </Stack>
                <TextField value={ticketId} onChange={handleTicketId} variant='outlined' type='text' size='small' label="ID du Ticket" required fullWidth InputLabelProps={{ shrink: true }}/>
              </Stack>
            </Paper>
            <TableContainer component={Paper}>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Heure</TableCell>
                    <TableCell align="left">Prix</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">Scans</TableCell>
                    <TableCell align="left">Scans Effectés</TableCell>
                    <TableCell align="left">Validité</TableCell>
                    <TableCell align="left">Expiration</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouvelle Vente
                      </Button>  
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    list && list.map(function(row, index){
                      if (index >= selectedTicketsPage*TABLE_ROWS_PER_PAGE && index <= (selectedTicketsPage+1)*TABLE_ROWS_PER_PAGE-1){
                        return(
                          <TableRow key={ row.id }>
                            <TableCell align="left">{ row.id } </TableCell>
                            <TableCell align="left">{ row.category }</TableCell>
                            <TableCell align="left">{ row.type }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("DD/MM/YYYY") }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("hh:mm:ss") }</TableCell>
                            <TableCell align="left">{ row.price }</TableCell>
                            <TableCell align="left">{ row.quantity }</TableCell>
                            <TableCell align="left">{ row.allowedScanNumber } { "(".concat(row.allowedScanNumber*row.quantity).concat(")") }</TableCell>
                            <TableCell align="left">{ row.scanNumber }</TableCell>
                            <TableCell align="left">{ moment(row.validityStartDatetime).format("DD/MM/YYYY") }</TableCell>
                            <TableCell align="left">{ moment(row.validityStopDatetime).format("DD/MM/YYYY") }</TableCell>
                            <TableCell align="right">
                              <Button onClick={(e)=>cancelTicketSell(e, row.id)} disabled={ (row.allowedScanNumber === row.scanNumber) || row.canceled} variant="text">
                                Annuler
                              </Button>
                              <Button onClick={(e)=>loadPrintableTicketPage(e, row.id)} disabled={row.printed} variant="text" endIcon={<PrintIcon/>}>
                                Ticket
                              </Button>
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
                count={sells.length}
                component={'div'}
                rowsPerPage={TABLE_ROWS_PER_PAGE}
                page={selectedTicketsPage}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Stack>
        </Container>
      </Grid>

    </Grid>
  );
}