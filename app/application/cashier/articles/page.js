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
import { DocumentScannerOutlined, ReportOffOutlined } from "@mui/icons-material";

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
  let [selectedPage, setSelectedPage] = React.useState(0)
  
  /** Search Ticket ID */
  let [articleId, setArticleId] = React.useState()
  
  /** Handlers */
  const handlePageChange = function(event, page){
    event.preventDefault()
    setSelectedPage(page)
  }

  const handleId = function(event){
    setArticleId(event.target.value)
  }

  const init = async function(){
    const OPTIONS = {
      method: "GET", 
    }
    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/articles/sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setSells(data.result)
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
    if (articleId != ""){
      setList(sells.filter(function(item){
        return item.id == articleId
      }))
    }
    else{
      init()
      setList(sells)
    }
  }, [articleId])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/cashier/articles/add-sell')
  }

  const loadInvoicePage = function(event, id){
    event.preventDefault()
    router.replace('/application/cashier/articles/printable/invoice?id='.concat(id))
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"articles"} element={"Librairie & Boutique du Musée"}/>
      </Grid>
      {/** Category Buttons */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}} >
        <Container maxWidth="xl"> 
          <Stack direction={"column"} spacing={2} >
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="h6">
                    Librairie & Boutique du Musée
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
                    Tappez l'ID de la vente à rechercher pour filtrer la table.
                  </Typography>
                </Stack>
                <TextField value={articleId} onChange={handleId} variant='outlined' type='text' size='small' label="ID de Vente" required fullWidth InputLabelProps={{ shrink: true }}/>
              </Stack>
            </Paper>
            <TableContainer component={Paper}>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Categorie</TableCell>
                    <TableCell align="left">Label</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Heure</TableCell>
                    <TableCell align="left">Prix (HT)</TableCell>
                    <TableCell align="left">TVA</TableCell>
                    <TableCell align="left">Prix Unitaire (TTC)</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">Prix Total(TTC)</TableCell>
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
                      if (index >= selectedPage*TABLE_ROWS_PER_PAGE && index <= (selectedPage+1)*TABLE_ROWS_PER_PAGE-1){
                        return(
                          <TableRow key={ row.id }>
                            <TableCell align="left">{ row.id } </TableCell>
                            <TableCell align="left">{ row.category }</TableCell>
                            <TableCell align="left">{ row.label }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("DD/MM/YYYY") }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("hh:mm:ss") }</TableCell>
                            <TableCell align="left">{ row.price }</TableCell>
                            <TableCell align="left">{ row.VATRate }</TableCell>
                            <TableCell align="left">{ row.price+row.price*row.VATRate }</TableCell>
                            <TableCell align="left">{ row.quantity }</TableCell>
                            <TableCell align="left">{ row.quantity*(row.price+row.price*row.VATRate) }</TableCell>
                            <TableCell align="right">
                              <Button variant="text" onClick={null}>
                                Annuler
                              </Button>
                              <Button variant="text" onClick={(e)=>loadInvoicePage(e, row.id)}  endIcon={<PrintIcon/>}>
                                Facturette
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
                page={selectedPage}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Stack>
        </Container>
      </Grid>

    </Grid>
  );
}