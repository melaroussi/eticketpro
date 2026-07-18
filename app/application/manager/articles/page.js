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


// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import NavigationSystem from '../components/NavigationSystem';


import { useRouter } from 'next/navigation'
 


const DRAWER_WIDTH = 250;

export default function Dashboard(props) {
  const router = useRouter()

  let [articles, setArticles] = React.useState([])
  let [loading, setLoading] = React.useState(true)
  
  /** UseEffect */
  React.useEffect(function(){
    const OPTIONS = {
      method: "GET", 
    }
    setArticles([])
    fetch(process.env.API_USER_ENDPOINT.concat("/articles"), OPTIONS).then(function(response){
      response.json().then(function(data){
        let list = data.result
        /** List */
        setArticles(list)
        setLoading(false)
      })
    })
  }, [])

  const loadCreatePage = function(event, id){
    event.preventDefault()
    router.replace('/application/manager/articles/create')
  }

  const loadUpdatePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/articles/update?id=".concat(id))
  }

  const loadSupplyPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/articles/supply?id=".concat(id))
  }

  const loadReadPage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/articles/read?id=".concat(id))
  }

  const loadDeletePage = function(event, id){
    event.preventDefault()
    router.push("/application/manager/articles/delete?id=".concat(id))
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"articles"} element={"Gestion des Articles"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** Data Table*/}
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Réference</TableCell>
                    <TableCell align="left">Catégorie</TableCell>
                    <TableCell align="left">Label</TableCell>
                    <TableCell align="left">Prix (HT)</TableCell>
                    <TableCell align="left">Quantité en Stock</TableCell>
                    <TableCell align="left">Suivi du Stock</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={loadCreatePage} endIcon={<AddCircleIcon/>}>
                        Nouveau
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    articles.map(function(row){
                      return(
                        <TableRow key={ row.id }>
                          <TableCell align="left">{ row.reference }</TableCell>
                          <TableCell align="left">{ row.category }</TableCell>
                          <TableCell align="left">{ row.label }</TableCell>
                          <TableCell align="left">{ row.price }</TableCell>
                          <TableCell align="left">{ row.availableQuantity }</TableCell>
                          <TableCell align="left">{ row.warehousing }</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={(e)=>loadUpdatePage(e, row.id)}>
                              <EditNoteIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={(e)=>loadReadPage(e, row.id)}>
                              <ReadMoreIcon/>
                            </IconButton>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}