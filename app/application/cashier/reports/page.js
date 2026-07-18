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
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
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
import AppBar from '@mui/material/AppBar';

import Container from '@mui/material/Container';


// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DocumentScannerOutlined, PrintOutlined } from "@mui/icons-material";

import { green, pink, grey } from '@mui/material/colors';

import { useRouter } from 'next/navigation'
import NavigationSystem from '../components/NavigationSystem';
 
const moment = require("moment"); 

const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  let [reports, setReports] = React.useState([])

  let [loading, setLoading] = React.useState(true)
  
  /** Load DB */
  const load = function(){
    let id = onlineUser?.id

    const OPTIONS = {
      method: "GET", 
    }
    setReports([])
    fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=get-all&userId=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setReports(list)
        setLoading(false)
      })
    })
  }

  /** UseEffect */
  React.useEffect(function(){
    load()
  }, [onlineUser])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/cashier/reports/create')
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/cashier/reports/delete?id=".concat(id))
  }

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/cashier/reports/read?id=".concat(id))
  }

  const loadDailyReportPage = function(event, id){
    event.preventDefault()
    router.replace("/application/cashier/reports/printable/chief-daily-report?id=".concat(id))
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"reports"} element={"Rapports de Clôture"}/>
      </Grid>
      {/** Data Table*/}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10}}>
        <Container maxWidth="xl">
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Heure</TableCell>
                  <TableCell align="left">Cash</TableCell>
                  <TableCell align="left">TPE</TableCell>
                  <TableCell align="left">Web</TableCell>
                  <TableCell align="left">Chèque</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                      Nouveau
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  reports && reports.map(function(row){
                    return(
                      <TableRow key={ row.id }>
                        <TableCell align="left">{ moment(row.reportDatetime).format("DD/MM/YYYY") }</TableCell>
                        <TableCell align="left">{ moment(row.reportDatetime).format("hh:mm") }</TableCell>
                        <TableCell align="left">{ row.cashTurnover }</TableCell>
                        <TableCell align="left">{ row.TPETurnover }</TableCell>
                        <TableCell align="left">{ row.webTurnover }</TableCell>
                        <TableCell align="left">{ row.checkTurnover }</TableCell>
                        <TableCell align="left">{ row.turnover }</TableCell>
                        <TableCell align="right">
                          <Button onClick={(e)=>loadReadPage(e, row.id)} disabled={row.printed} variant="text" endIcon={<ReadMoreIcon/>}>
                            Détails
                          </Button>
                          <Button onClick={(e)=>loadDailyReportPage(e, row.id)} disabled={row.printed} variant="text" endIcon={<PrintOutlined/>}>
                            Génerer le PV
                          </Button>
                          <IconButton color="primary" onClick={(e)=>loadDeletePage(e, row.id)}>
                            <DeleteOutlineIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </Grid>
  );
}