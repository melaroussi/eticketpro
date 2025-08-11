"use client"
import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import PeopleIcon from '@mui/icons-material/People'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import Avatar from '@mui/material/Avatar'

/** Icons import */
import InboxIcon from '@mui/icons-material/MoveToInbox'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import StyleIcon from '@mui/icons-material/Style'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PrintIcon from '@mui/icons-material/Print'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

import { blue, grey } from '@mui/material/colors'

import { useRouter } from 'next/navigation'
import { Category } from '@mui/icons-material'


const DRAWER_WIDTH = 250

export default function NavigationSystem(props) {
  /** Router hook */ 
  const router = useRouter()

  let [onlineUser, setOnlineUser] = React.useState("XX")

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  const loadProfileUpdate = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/manager/profile")
  }

  const handleDrawerLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/manager/".concat(target))
  }

  const drawer = (
    <div>
      <Toolbar disableGutters>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
          <Avatar sx={{ bgcolor: grey[900], ml: 2, mr: 1}} >
            <StyleIcon />
          </Avatar>
          <Typography variant='h6' sx={{ ml: 0}}>eTicket Pro</Typography>
        </Stack>
      </Toolbar>
      <Divider />
      <List dense={true}>
        <ListSubheader>Configurations de Base</ListSubheader>
        <ListItem disablePadding key={"zones"} >
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "zones")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <CorporateFareIcon color={ props.indicator == "zones" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Zones"} primaryTypographyProps={{ color: props.indicator == "zones" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding key={"readers"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "readers")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <QrCodeIcon color={ props.indicator == "readers" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Lecteurs"} primaryTypographyProps={{ color: props.indicator == "readers" ? "primary" : "inherit" }} />
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding key={"departments"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "departments")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <AddBusinessIcon color={ props.indicator == "departments" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Departements"} primaryTypographyProps={{ color: props.indicator == "departments" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding key={"categories"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "categories")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <Category color={ props.indicator == "categories" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Categories"} primaryTypographyProps={{ color: props.indicator == "categories" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding key={"users"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "users")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <PeopleIcon color={ props.indicator == "users" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Utilisateurs"} primaryTypographyProps={{ color: props.indicator == "users" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key={"printables"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "printables")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <PrintIcon color={ props.indicator == "printables" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Impression"} primaryTypographyProps={{ color: props.indicator == "printables" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem>
        <ListSubheader>Configuration des Billets</ListSubheader>   
        <ListItem disablePadding key={"tickets"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "tickets")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <ConfirmationNumberIcon color={ props.indicator == "tickets" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Tickets"} primaryTypographyProps={{ color: props.indicator == "tickets" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key={"tickets-analytics"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "tickets/analytics")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <AccountTreeIcon color={ props.indicator == "tickets-analytics" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Reporting Bielleterie"} primaryTypographyProps={{ color: props.indicator == "tickets-analytics" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem>
        <ListSubheader>Gestion du Stock</ListSubheader>   
        <ListItem disablePadding key={"articles"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "articles")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <AddShoppingCartIcon color={ props.indicator == "articles" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Articles"} primaryTypographyProps={{ color: props.indicator == "articles" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key={"supplies"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "supplies")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <WarehouseIcon color={ props.indicator == "supplies" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Etat du Stock"} primaryTypographyProps={{ color: props.indicator == "supplies" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding key={"supplies-history"}>
          <ListItemButton onClick={(e)=>handleDrawerLinks(e, "supplies/history")}>
            <ListItemIcon sx={{ mr: -2 }}>
              <LocalShippingIcon color={ props.indicator == "supplies-history" ? "primary" : "inherit" }/>
            </ListItemIcon>
            <ListItemText primary={"Approvisionnements"} primaryTypographyProps={{ color: props.indicator == "supplies-history" ? "primary" : "inherit" }}/>
          </ListItemButton>
        </ListItem> 
      </List>
    </div>
  )

  return (
    <>
      <AppBar position="fixed" sx={{width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` }}}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={ logout } sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Espace Administration - { props.element } </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" edge="end" onClick={ loadProfileUpdate } sx={{ mr: 1 }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" edge="end" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer variant="temporary" open={ mobileOpen } onClick={ logout } ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }}}>
          {drawer}
        </Drawer>
        <Drawer  variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }}} open >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}
