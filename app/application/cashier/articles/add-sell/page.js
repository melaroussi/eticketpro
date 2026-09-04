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


const moment = require("moment"); 


const DRAWER_WIDTH = 250;
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
  let [articles, setArticles] = React.useState([])
  /** Filtered Ticket List */
  let [filteredarticles, setFilteredarticles] = React.useState([])
  /** Selected Ticket Page */
  let [selectedArticlesPage, setSelectedArticlesPage] = React.useState(0)
  /** Selected Category */
  let [category, setCategory] = React.useState()
  /** Categories List */
  let [categories, setCategories] = React.useState([])
  
  /** Handlers */
  const handlePageChange = function(event, page){
    event.preventDefault()
    setSelectedArticlesPage(page)
  }

  const handleValidityStartDatetime = function(event, articleId){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.articleId === articleId){
        item.validityStartDatetime = event.target.value
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
        articleId: element.id,
        category: element.category,
        availableQuantity: element.availableQuantity,
        label: element.label,
        price: element.price,
        VATRate: element.VATRate,
        quantity: 1,
        paiementType: "ESPECE",
        userId: onlineUser.id
      })
      /** Refresh the page */
      router.refresh()
    }    
  }

  /** Add From Cart */
  const plusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.articleId === id){
        if (item.availableQuantity > item.quantity){
          item.quantity++
          /** Page Refresh */
          router.refresh()
        }
      }
    })
  }

  /** Remove From Cart */
  const minusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.articleId === id){
        item.quantity--
        /** Check if It Was the last */
        if (item.quantity == 0){
          // Remove Element with Filtering
          setCart(cart.filter((element)=> element.articleId != item.articleId))
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
  const isDisabled = function(article){
    let disabled = false;
    
    cart.forEach(function(item){
      if (item.articleId === article.id) disabled = true
    })

    if (article.availableQuantity === 0 ) disabled = true
    
    return disabled
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
    fetch(process.env.API_USER_ENDPOINT.concat("/articles"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result || []
        const mapped = list.map(item => ({
          id: item.id,
          category: item.category,
          label: item.label,
          price: item.price,
          VATRate: item.VATRate,
          availableQuantity: item.availableQuantity,
          description: item.description,
          image: item.image
        }));
        setArticles(mapped);
        setFilteredarticles(mapped);
        
        const uniqueCats = Array.from(new Set(mapped.map(a => a.category)));
        setCategories(uniqueCats);
        if (uniqueCats.length > 0) {
          setCategory(uniqueCats[0]);
          setFilteredarticles(mapped.filter(a => a.category === uniqueCats[0]));
        }
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
      fetch(process.env.API_USER_ENDPOINT.concat("/articles/sells?operation=sell"), OPTIONS).then(function(response){
        router.replace('/application/cashier/articles')
      })
    }
  }

  /** Filter articles by Categories */
  const filterByCategory = function(event, targetCategory){
    event.preventDefault()
    /** Update Category for Button Color */
    setCategory(targetCategory)
    /** Filter Array */
    setFilteredarticles(    
      articles.filter(function(ticket){
        return ticket.category === targetCategory
      })
    )
    /** Page Refresh */
    router.refresh()
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
    <>
      <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"articles"} element={"Librairie & Boutique du Musée"}/>
      </Grid>
      {/** Category Buttons */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}} height={"50vh"} overflow={"scroll"}>
        <Container maxWidth="xl"> 
          <Stack direction={"column"} spacing={2} >
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                  <Stack direction={"column"} spacing={0}>
                    <Typography variant="h6">
                      Librairie & Boutique du Musée
                    </Typography>
                    <Typography variant="body1">
                    {
                      onlineUser && <span>Bonjour {onlineUser.firstName} {onlineUser.lastName} (Caisse)</span>
                    }
                    </Typography>
                  </Stack>
                  <Button variant="outlined" onClick={(e) => handleLinks(e, "cashier/articles")} size="small">
                    Consulter les Ventes Boutique
                  </Button>
                </Stack>
              </Stack>
            </Paper>
            <Paper sx={{padding: 2}}>
              <Stack direction={"column"} spacing={2}>
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="h6">
                    Sélection des Articles
                  </Typography>
                  <Typography variant="body1">
                    Choisissez une catégorie pour visualiser ses articles.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                {
                  categories.map(function(item){
                    return(
                      <Button key={item} onClick={(e)=>filterByCategory(e, item)} variant={"contained"} color={item === category ? "primary" : "inherit"} sx={{ borderRadius: 2, textTransform: 'none' }}>
                        { item }
                      </Button>
                    )
                  })
                }
              </Stack>
              <Stack direction={"row"} spacing={2} overflow={"auto"} sx={{ mt: 3, pb: 1 }}>
                {
                  filteredarticles && filteredarticles.map(function(item){
                    return(
                      <Card key={item.id} sx={{ width: 280, minWidth: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        {item.image && (
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.label}
                            sx={{ objectFit: 'contain', p: 1, bgcolor: '#f8fafc' }}
                          />
                        )}
                        <CardHeader 
                          avatar={<Avatar variant="rounded" sx={{backgroundColor: green[500]}}>{ item.id }</Avatar>} 
                          title={item.label} 
                          subheader={<Typography variant="button" sx={{ fontWeight: 700, color: 'primary.main' }}>{item.price} {"DH"}</Typography>}
                          sx={{ pb: 1 }}
                        />
                        <CardContent sx={{ pt: 0, pb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            { item.availableQuantity === 0 ? "Rupture en Stock" : item.availableQuantity + " en stock"} 
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button onClick={(e)=>addToCart(e, item)} disabled={isDisabled(item)} variant={"contained"} color={"primary"} fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                            Ajouter
                          </Button>
                        </CardActions>
                      </Card>
                    )
                  })
                }
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Grid>

      { /** Filtered articles Table */}
      <Grid item xs={12} sm={12} height={"30vh"}>
          <Container maxWidth="xl">
            <Typography variant="h6">
              Panier
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Categorie</TableCell>
                    <TableCell align="left">Label</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Heure</TableCell>
                    <TableCell align="left">Prix (HT)</TableCell>
                    <TableCell align="left">TVA (%)</TableCell>
                    <TableCell align="left">Prix Unitaire (TTC)</TableCell>
                    <TableCell align="left">Paiement</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">Prix Total (TTC)</TableCell>
                    <TableCell align="right">

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    cart && cart.map(function(row, index){
                      if (index >= selectedArticlesPage*TABLE_ROWS_PER_PAGE && index <= (selectedArticlesPage+1)*TABLE_ROWS_PER_PAGE-1){
                        return(
                          <TableRow key={ index }>
                            <TableCell align="left">{ row.category }</TableCell>
                            <TableCell align="left">{ row.label }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("DD/MM/YYYY") }</TableCell>
                            <TableCell align="left">{ moment(row.datetime).format("hh:mm:ss") }</TableCell>
                            <TableCell align="left">{ row.price }</TableCell>
                            <TableCell align="left">{ row.VATRate } </TableCell>
                            <TableCell align="left">{ row.price+row.price*row.VATRate/100 }</TableCell>
                            <TableCell align="center" sx={{width: 100}}>
                              <TextField value={row.paiementType} defaultValue={row.paiementType} onChange={(e)=>updatePaiementType(e, row.ticketId)} variant='outlined' size='small'  required InputLabelProps={{ shrink: true }} select>
                                <MenuItem value={"ESPECE"}>ESPECE</MenuItem>
                                <MenuItem value={"CHEQUE"}>CHEQUE</MenuItem>
                                <MenuItem value={"TPE"}>TPE</MenuItem>
                                <MenuItem value={"WEB"}>WEB</MenuItem>
                              </TextField>
                            </TableCell>
                            <TableCell align="left">{ row.quantity }</TableCell>
                            <TableCell align="left">{ parseFloat(row.quantity*(row.price+row.price*row.VATRate/100)).toFixed(2) }</TableCell>
                            <TableCell align="right">
                              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={(e)=>minusOne(e, row.articleId)}>
                                  <RemoveCircleIcon/>
                                </Button>
                                <Button onClick={(e)=>plusOne(e, row.articleId)}>
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
                page={selectedArticlesPage}
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
                <Button onClick={(e)=>handleLinks(e, "cashier/articles")} variant="contained" color="inherit" fullWidth>
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
