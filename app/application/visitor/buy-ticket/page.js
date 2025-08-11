"use client"
import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import CardActions  from '@mui/material/CardActions'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import CardContent from '@mui/material/CardContent'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ButtonGroup  from '@mui/material/ButtonGroup'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid, Stack } from '@mui/material'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import TablePagination from '@mui/material/TablePagination'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import InputAdornment from '@mui/material/InputAdornment'
import TableRow from '@mui/material/TableRow'
import TextField from "@mui/material/TextField"
import Container from '@mui/material/Container'
import TableContainer from '@mui/material/TableContainer'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'

/** Colors imports */
import { green, pink, blue, grey } from "@mui/material/colors"

// Icons Import
import AddCircleIcon from "@mui/icons-material/AddCircle"
import CloseIcon  from "@mui/icons-material/Close"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

/** Hooks */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import NavigationSystem from '../components/NavigationSystem'

const TABLE_ROWS_PER_PAGE = 5
const moment = require("moment")


export default function Page(props) {

  const router = useRouter()
  const searchParams = useSearchParams()
  

  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])


  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)
  
  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [cardHolder, setCardHolder] = React.useState("SMAIL")
  let [cardNumber, setCardNumber] = React.useState("4111111111111111")
  let [expirationMonth, setExpirationMonth] = React.useState("10")
  let [expirationYear, setExpirationYear] = React.useState("2025")
  let [CVV, setCVV] = React.useState("000")
  let [preAuthorization, setPreAuthorization] = React.useState(false)
  let [postAuthorization, setPostAuthorization] = React.useState(false)
  let [transactionDone, setTransactionDone] = React.useState(false)
  
  /** State handlers */
  const handleCardHolder = function(event){
    setCardHolder(event.target.value)
  }

  const handleCardNumber = function(event){
    setCardNumber(event.target.value)
  }

  const handleExpirationMonth = function(event){
    setExpirationMonth(event.target.value)
  }

  const handleExpirationYear = function(event){
    setExpirationYear(event.target.value)
  }

  const handleCVV = function(event){
    setCVV(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  /** Total HT */
  let [totalHT, setTotalHT] = React.useState(0)
  /** VAT */
  let [VAT, setVAT] = React.useState(0)
  /** Total TTC */
  let [totalTTC, setTotalTTC] = React.useState(0)

  /** Tickets */
  let [tickets, setTickets] = React.useState([])
  /** Cart */
  let [cart, setCart] = React.useState([])
  /** Selected Ticket Page */
  let [selectedTicketsPage, setSelectedTicketsPage] = React.useState(0)
  
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
  

  /** Add From Cart */
  const plusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        item.quantity++
        /** Update Invoice */
        setTotalHT(totalHT+item.price)
        /** Page Refresh */
        router.refresh()
      }
    })
  }

  /** Effect for VAT and TTC Auto Update */
  React.useEffect(function(){
    setVAT(totalHT*0.2)
    setTotalTTC(totalHT*1.2)
  }, [totalHT])

  /** Remove From Cart */
  const minusOne = function(event, id){
    event.preventDefault()
    cart.forEach(function(item){
      if (item.ticketId === id){
        /** Check if It Was the last */
        if (item.quantity > 0){
          /** Remove Element with Filtering */
          item.quantity--
          /** Update Invoice */
          setTotalHT(totalHT-item.price)
        }
        /** Page Refresh */
        router.refresh()
      }
    })
  }

  /** Remove From Cart */
  const cartIsNotEmpty = function(){
    let counter = 0

    cart.forEach(function(item){
      if (item.quantity > 0) counter++
    })

    return counter > 0
  }

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }

    /** Getting Data Again */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets"), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setTickets(data.result)
        }
      })
    })

  }, [])

  /** Initial Loading UseEffect */
  React.useEffect(function(){
    if (tickets){
      /** Getting Only Online Tickets */
      tickets.forEach(function(element){
        if (element.needReservation === "Vendable sans Reservation" || element.needReservation === "Vendable avec Reservation"){
          cart.push({
            ticketId: element.id,
            category: element.category,
            type: element.type,
            price: element.price,
            quantity: 0,
            validityStartDatetime: moment().format("YYYY-MM-DD").toString(),
            validityStopDatetime: moment().format("YYYY-MM-DD").toString(),
            allowedScanNumber: 1,
            allowedScanNumber: parseInt(element.allowedScanNumber),
            onTimeDefinitionAllowedScanNumber: element.onTimeDefinitionAllowedScanNumber,
            paiementType: "WEB",
            userId: onlineUser?.id
          })
        }
      })
    }
    /** Auto-refresh */
    router.refresh()
  }, [onlineUser, tickets])

  /** Save Transaction */
  const save = async function(event){
    event.preventDefault()

    /** Save endpoint call */
    if (!cartIsNotEmpty()){
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
        body: JSON.stringify({
          cart: cart,
          cardNumber: cardNumber,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
          CVV: CVV,
          totalTTC: totalTTC
        })
      }
      fetch(process.env.API_USER_ENDPOINT.concat("/tickets/online-sells"), OPTIONS).then(function(response){
        response.json().then(function(data){
          router.replace('/application/visitor')
          //alert(JSON.stringify(data))
        }) 
      })
    }   
  }

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  const cancel = function(e){
    e.preventDefault()
    /** Initialize Cart */
    cart.forEach(function(item){
      item.quantity = 0
    })
    /** Init Amounts */
    setTotalHT(0)
    setVAT(0)
    setTotalTTC(0)
    /** Erase Card Infos */
    setCardHolder("")
    setCardNumber("")
    setExpirationMonth("")
    setExpirationYear("")
    setCVV("")
    /** Auto-refresh */
    router.refresh()
  }


  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"profile"} element={"Espace Personnel"}/>
      </Grid>
      {/** UI */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}} >
        {/** Cart Table */}
        <Container maxWidth={"xl"}>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow sx={{ margin: 3}}>
                  <TableCell align="left">Billet</TableCell>
                  <TableCell align="left">Categorie</TableCell>
                  <TableCell align="left">Prix</TableCell>
                  <TableCell align="left">Date A</TableCell>
                  <TableCell align="left">Date B</TableCell>
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
                          <TableCell align="left">{ row.type }</TableCell>
                          <TableCell align="left">{ row.category }</TableCell>
                          <TableCell align="left">{ row.price }</TableCell>
                          <TableCell align="center" sx={{width: 100}}>
                            <TextField value={row.validityStartDatetime} onChange={(e)=>handleValidityStartDatetime(e, row.ticketId)} variant="outlined" type="date" size="small" required fullWidth InputLabelProps={{ shrink: true }}/>
                          </TableCell>
                          <TableCell align="center" sx={{width: 200}}>
                            <TextField value={row.validityStopDatetime} onChange={(e)=>handleValidityStopDatetime(e, row.ticketId)} variant="outlined" type="date" size="small" required fullWidth InputLabelProps={{ shrink: true }}/>
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

      <Grid item xs={12} sm={12} sx={{paddingTop: 5}} >
        {/** Paiement Infos Section */}
        <Container maxWidth={"xl"}>
          <Paper>
            <Grid container>
              <Grid item xs={6} sm={6} sx={{padding: 2}}>
                <Typography variant="h6">
                 Cher client, veuillez noter que le montant total hors taxes s'élève à  {parseFloat(totalHT).toFixed(2)} DH, la TVA est de  {parseFloat(VAT).toFixed(2)} DH, et le montant total toutes taxes comprises (TTC) est de {parseFloat(totalTTC).toFixed(2)} DH.
                </Typography>
              </Grid>
              
              <Grid item xs={6} sm={6} sx={{padding: 2}}>
                {/** Credit Card Infos */}
                <Stack spacing={1}>
                  <TextField value={cardHolder} onChange={handleCardHolder} variant='outlined' size='small' placeholder="Nom du titulaire de la carte" autoFocus required fullWidth InputLabelProps={{ shrink: true}} InputProps={{ startAdornment:<InputAdornment position="start"> <PersonOutlineIcon /></InputAdornment> }}/>
                  <TextField value={cardNumber} onChange={handleCardNumber} variant='outlined' size='small' placeholder="Numéero de carte" required fullWidth InputLabelProps={{ shrink: true }} InputProps={{ startAdornment:<InputAdornment position="start"> <CreditCardIcon /></InputAdornment> }}/>   
                  <Stack spacing={1} direction={"row"}>
                    <TextField value={expirationMonth} onChange={handleExpirationMonth} variant='outlined' size='small' placeholder="Mois" required fullWidth InputLabelProps={{ shrink: true }} InputProps={{ startAdornment:<InputAdornment position="start"> <CalendarMonthIcon /></InputAdornment> }}/>
                    <TextField value={expirationYear} onChange={handleExpirationYear} variant='outlined' size='small' placeholder="Année" required fullWidth InputLabelProps={{ shrink: true }} InputProps={{ startAdornment:<InputAdornment position="start"> <CalendarMonthIcon/></InputAdornment> }}/>
                    <TextField value={CVV} onChange={handleCVV} variant='outlined' size='small' placeholder="CVV" required fullWidth InputLabelProps={{ shrink: true }} InputProps={{ startAdornment:<InputAdornment position="start"> <VerifiedUserIcon /></InputAdornment> }}/>
                  </Stack>
                  <Button disabled={!cartIsNotEmpty()} onClick={save} size="medium" variant='contained' fullWidth>Payer</Button>
                  <Button onClick={cancel} size="medium" variant='outlined' fullWidth>Annuler</Button>
                </Stack>
              </Grid> 
            </Grid> 
          </Paper>
        </Container>
      </Grid>
    </Grid>
  )
}
