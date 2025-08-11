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
import TablePagination from "@mui/material/TablePagination";

// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, grey, pink } from '@mui/material/colors';

import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';


import NavigationSystem from '../../components/NavigationSystem';


import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const moment = require("moment"); 

const DRAWER_WIDTH = 250;
const TABLE_ROWS_PER_PAGE = 10

export default function Dashboard(props) {
  /** KPIs */
  let [yearSells, setYearSells] = React.useState()
  let [monthSells, setMonthSells] = React.useState()
  let [daySells, setDaySells] = React.useState()
  let [yearTurnover, setYearTurnover] = React.useState()
  let [monthTurnover, setMonthTurnover] = React.useState()
  let [dayTurnover, setDayTurnover] = React.useState()

  /** Datetime Filters */
  let [startDatetime, setStartDatetime] = React.useState()
  let [stopDatetime, setStopDatetime] = React.useState()
  
  /** Chart Data */
  let [sellsByType, setSellsByType] = React.useState([])
  let [sellsByCategory, setSellsByCategory] = React.useState([])
  let [turnoverByType, setTurnoverByType] = React.useState([])
  let [turnoverByCategory, setuTrnoverByCategory] = React.useState([])

  /** Ticket List */
  let [sells, setSells] = React.useState([])
  /** Selected Ticket Page */
  let [selectedTicketsPage, setSelectedTicketsPage] = React.useState(0)

  /** Handlers */
  const handlePageChange = function(event, page){
    event.preventDefault()
    setSelectedTicketsPage(page)
  }

  const handleStartDatetime = function(event){
    event.preventDefault()
    setStartDatetime(event.target.value)
  }

  const handleStopDatetime = function(event){
    event.preventDefault()
    setStopDatetime(event.target.value)
  }

  /** Functions */
  const init = function(event){
    event.preventDefault()
    setStartDatetime(null)
    setStopDatetime(null)

    const OPTIONS = {
      method: "GET",
    }
    /** Getting All Ticket Sells */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setSells(data.result)
      })
    })
  }

  const filterButtonIsDisabled = function(){
    if (startDatetime && stopDatetime){
      let _startDatetime = new Date(startDatetime)
      let _stopDatetime = new Date(stopDatetime)

      if (_startDatetime <= _stopDatetime) return false
    }

    return true
  }

  const filter = function(event){
    event.preventDefault()

    const OPTIONS = {
      method: "GET", 
    }
    /** Getting All Ticket Sells */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          let _startDatetime = new Date(startDatetime)
          let _stopDatetime = new Date(stopDatetime)
          
          setSells(data.result.filter(function(item){
            let _sellDatetime = new Date(item.datetime)
            return _sellDatetime >= _startDatetime && _sellDatetime <= _stopDatetime
          }))
        }
      })
    })
  }

  const download = function(event){
    event.preventDefault()
    //alert('download')
  }

  /** Hooks */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=year-sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setYearSells(data.result[0].sellsNumber)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=month-sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setMonthSells(data.result[0].sellsNumber)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=day-sells"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setDaySells(data.result[0].sellsNumber)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=year-turnover"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setYearTurnover(data.result[0].turnover)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=month-turnover"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setMonthTurnover(data.result[0].turnover)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=day-turnover"), OPTIONS).then(function(response){
      response.json().then(function(data){
        setDayTurnover(data.result[0].turnover)
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=sells-by-type"), OPTIONS).then(function(response){
      response.json().then(function(data){
        data.result.forEach(function(item, key){
          sellsByType.push({id: key, value: item.sellsNumber, label: item.type })
        })
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=sells-by-category"), OPTIONS).then(function(response){
      response.json().then(function(data){
        data.result.forEach(function(item, key){
          sellsByCategory.push({id: key, value: item.sellsNumber, label: item.category })
        })
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=turnover-by-category"), OPTIONS).then(function(response){
      response.json().then(function(data){
        data.result.forEach(function(item, key){
          turnoverByCategory.push({id: key, value: item.turnover, label: item.category })
        })
      })
    })

    /** Getting KPIs */
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=turnover-by-type"), OPTIONS).then(function(response){
      response.json().then(function(data){
        data.result.forEach(function(item, key){
          turnoverByType.push({id: key, value: item.turnover, label: item.type })
        })
      })
    })
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"articles-analytics"} element={"Gestion des Articles"}/>

      <Box component="main" sx={{ backgroundColor: grey[50], flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Vente de l'Année
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre de tcket vendu l'année en cours.
                </Typography>
                <Typography variant='h5' align='center'>
                  {yearSells}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
              <Typography variant='button' align='center'>
                  Vente du Mois
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre de tickets vendus le mois en cours.
                </Typography>
                <Typography variant='h5' align='center'>
                  {monthSells}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
              <Typography variant='button' align='center'>
                  Vente du Jour
                </Typography>
                <Typography variant='body2' align='center'>
                  Nombre de tickets vendus aujourd'hui.
                </Typography>
                <Typography variant='h5' align='center'>
                  {daySells}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Chiffre d'Affaire Annuel
                </Typography>
                <Typography variant='body2' align='center'>
                  Chiffre d'affaire réalisé cette année.
                </Typography>
                <Typography variant='h5' align='center'>
                  {yearTurnover} DH
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Chiffre d'Affaire du Mois
                </Typography>
                <Typography variant='body2' align='center'>
                  Chiffre d'affaire réalisé ce mois.
                </Typography>
                <Typography variant='h5' align='center'>
                  {monthTurnover} DH
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** KPI Card */}
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'}>
                <Typography variant='button' align='center'>
                  Chiffre d'Affaire du Jour
                </Typography>
                <Typography variant='body2' align='center'>
                  Chiffre d'affaire dréalisé aujourd'hui.
                </Typography>
                <Typography variant='h5' align='center'>
                  {dayTurnover} DH
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          {/** Charts Card */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                <Typography variant='h6' align='left'>
                  Chiffre d'Affaire par Type de Ticket
                </Typography>
                <Typography variant='body2' align='left'>
                  Distribution du chiffre d'affaire par type de Ticket vendus au cours de l'année en cours.
                </Typography>
                {
                  turnoverByType && <PieChart
                    series={[
                      {
                        data: turnoverByType,
                        innerRadius: 50,
                        outerRadius: 100,
                        cx: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'left' },
                      },
                    }}

                    width={600}
                    height={300}
                  />
                }
              </Stack>
            </Paper>
          </Grid>
          {/** Charts Card */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                <Typography variant='h6' align='left'>
                  Nombre de Vente par Categorie de Ticket
                </Typography>
                <Typography variant='body2' align='left'>
                  Distribution du nombre de vente par categorie de ticket vendus au cours de l'année en cours.
                </Typography>
                {
                  sellsByCategory && <PieChart
                    series={[
                      {
                        data: sellsByCategory,
                        innerRadius: 50,
                        outerRadius: 100,
                        cx: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'left' },
                      },
                    }}

                    width={600}
                    height={300}
                  />
                }
              </Stack>
            </Paper>
          </Grid>
          {/** Charts Card */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'} justifyContent={'center'} alignItems={'self-start'}>
                <Typography variant='h6' align='left'>
                  Chiffre d'Affaire par Categorie de Ticket
                </Typography>
                <Typography variant='body2' align='left'>
                  Distribution du chiffre d'affaire par type de Ticket vendus au cours de l'année en cours.
                </Typography>
                {
                  turnoverByCategory && <PieChart
                    series={[
                      {
                        data: turnoverByCategory,
                        innerRadius: 50,
                        outerRadius: 100,
                        cx: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'left' },
                      },
                    }}

                    width={600}
                    height={300}
                  />
                }
              </Stack>
            </Paper>
          </Grid>
          {/** Charts Card */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding:2 }}>
              <Stack direction={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                <Typography variant='h6' align='left'>
                  Nombre de Vente par Type de Ticket
                </Typography>
                <Typography variant='body2' align='center'>
                  Distribution du nombre de vente par type de ticket vendus au cours de l'année en cours.
                </Typography>
                {
                  sellsByType && <PieChart
                    series={[
                      {
                        data: sellsByType,
                        innerRadius: 50,
                        outerRadius: 100,
                        cx: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'left' },
                      },
                    }}

                    width={600}
                    height={300}
                  />
                }
              </Stack>
            </Paper>
          </Grid>
          {/** Data Table*/}
          <Grid item xs={12} sm={12}>
            <Stack direction={"column"} spacing={2}>
              {/** Date Filters */}
              <Paper sx={{padding: 2}}>
                <Stack direction={"column"} spacing={2}>
                  <Stack direction={"column"} spacing={0}>
                    <Typography variant="h6">
                      Recherche par Inteval de Dates {filterButtonIsDisabled()}
                    </Typography>
                    <Typography variant="body1">
                      Tappez les dates de début et fin de vente des tickets à rechercher pour filtrer la table.
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={4}>
                    <TextField value={startDatetime} onChange={handleStartDatetime} variant="outlined" type="date" size="small" label={"Date de Début"} required fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField value={stopDatetime} onChange={handleStopDatetime} variant="outlined" type="date" size="small" label={"Date de Fin"} required fullWidth InputLabelProps={{ shrink: true }}/>
                  </Stack>
                  <Button variant="contained" onClick={filter} disabled={filterButtonIsDisabled()}>
                    { filterButtonIsDisabled() ? "Selectionner les Dates pour Activer le Boutton": "Charger Uniquement les Ventes du ".concat(moment(startDatetime).format("DD/MM/YYYY")).concat(" au ").concat(moment(stopDatetime).format("DD/MM/YYYY"))} 
                  </Button>
                  <Button variant="outlined" onClick={init}>Charger Toutes les Ventes</Button>
                </Stack>
              </Paper>

              {/** Date Filters */}
              <TableContainer component={Paper}>
                <Table size="medium" >
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
                      <TableCell align="left">
                        <Button disabled={sells.length === 0} variant="contained" onClick={download}>
                          Exporter
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      sells && sells.map(function(row, index){
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
                              <TableCell align="left"></TableCell>
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
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}
