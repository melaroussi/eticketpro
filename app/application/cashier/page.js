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

import Image from 'next/image'
// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green, pink } from '@mui/material/colors';

import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';

const DRAWER_WIDTH = 250;

export default function Dashboard(props) {


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** KPI Card */}
          <Grid item xs={12} sm={12}>
            <Container maxWidth="md">
              <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} >
                <Image src={"/images/logo.jpeg"} width={200} height={200}/>
                <Typography variant="h4" align="center">
                  Bienvenue sur eTicket Pro v1.0
                </Typography>
                <Typography variant="body1" align="center">
                  Bienvenue dans l'espace Caissier de la billetterie du Zoo de Rabat ! Ensemble, rendons chaque visite exceptionnelle. L'équipe du Zoo de Rabat
                </Typography>
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}