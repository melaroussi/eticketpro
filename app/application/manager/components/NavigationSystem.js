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
import MailIcon from '@mui/icons-material/Mail'
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
import MenuBookIcon from '@mui/icons-material/MenuBook'

import { blue, grey } from '@mui/material/colors'
import { useRouter } from 'next/navigation'
import { Category } from '@mui/icons-material'

const DRAWER_WIDTH = 270

export default function NavigationSystem(props) {
  /** Router hook */ 
  const router = useRouter()

  const [onlineUser, setOnlineUser] = React.useState(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Module verification logic
  const hasAccess = React.useCallback((moduleKey) => {
    if (!onlineUser) return true; // loading state
    if (onlineUser.email === "admin@e-ticket-pro.ma") return true; // Superadmin bypass
    
    let allowed = [];
    try {
      if (onlineUser.allowedModules) {
        allowed = JSON.parse(onlineUser.allowedModules);
      } else {
        return true; // default legacy (full access)
      }
    } catch (e) {
      return true;
    }

    if (allowed.includes("all") || allowed.length === 0) return true;
    return allowed.includes(moduleKey);
  }, [onlineUser]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem("user")
      if (user) {
        const parsedUser = JSON.parse(user);
        setOnlineUser(parsedUser);

        // Access protection checks for routes
        if (props.indicator) {
          const indicator = props.indicator;
          let moduleKey = null;
          if (["zones", "readers"].includes(indicator)) moduleKey = "zones_readers";
          else if (["departments", "users", "smtp"].includes(indicator)) moduleKey = "organisation";
          else if (["categories", "printables"].includes(indicator)) moduleKey = "categories_printables";
          else if (["tickets", "tickets-analytics", "subscriptions"].includes(indicator)) moduleKey = "tickets";
          else if (["articles", "supplies", "supplies-history"].includes(indicator)) moduleKey = "stock";

          if (moduleKey) {
            if (parsedUser.email !== "admin@e-ticket-pro.ma") {
              let allowed = [];
              try {
                if (parsedUser.allowedModules) {
                  allowed = JSON.parse(parsedUser.allowedModules);
                } else {
                  return; // default legacy
                }
              } catch (e) {}

              if (parsedUser.allowedModules && !allowed.includes("all") && allowed.length > 0 && !allowed.includes(moduleKey)) {
                // Not authorized to access this module page! Redirection to manager home.
                router.replace("/application/manager");
              }
            }
          }
        }
      }
    }
  }, [props.indicator, router]);

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("user")
    }
    router.push("/application/")
  }

  const handleDrawerToggle = function(event){
    event.preventDefault()
    setMobileOpen(!mobileOpen)
  }

  const loadProfileUpdate = function(event){
    event.preventDefault()
    router.push("/application/manager/profile")
  }

  const handleDrawerLinks = function(e, target){
    e.preventDefault()
    setMobileOpen(false)
    router.replace("/application/manager/".concat(target))
  }

  const renderDrawerItem = (target, label, icon, activeKey) => {
    const isActive = props.indicator === activeKey
    return (
      <ListItem disablePadding key={target} sx={{ px: 1.5, py: 0.25 }}>
        <ListItemButton 
          onClick={(e) => handleDrawerLinks(e, target)}
          sx={{
            borderRadius: '8px',
            py: 1,
            px: 2,
            transition: 'all 0.2s ease',
            backgroundColor: isActive ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
            color: isActive ? '#38bdf8' : '#94a3b8',
            '&:hover': {
              backgroundColor: isActive ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: isActive ? '#38bdf8' : '#f8fafc',
              '& .MuiListItemIcon-root': {
                color: isActive ? '#38bdf8' : '#f8fafc',
              }
            },
            '& .MuiListItemIcon-root': {
              color: isActive ? '#38bdf8' : '#94a3b8',
              minWidth: '35px',
              transition: 'color 0.2s ease',
            }
          }}
        >
          <ListItemIcon sx={{ mr: 0.5 }}>
            {icon}
          </ListItemIcon>
          <ListItemText 
            primary={label} 
            primaryTypographyProps={{ 
              fontSize: '0.875rem', 
              fontWeight: isActive ? 600 : 500,
            }}
          />
          {isActive && (
            <Box 
              sx={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: '#38bdf8', 
                ml: 1 
              }} 
            />
          )}
        </ListItemButton>
      </ListItem>
    )
  }

  const subheaderStyle = {
    backgroundColor: 'transparent',
    color: '#0ea5e9',
    fontWeight: 700,
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    pt: 2.5,
    pb: 0.5,
    px: 3.5,
    fontFamily: '"Outfit", "Inter", sans-serif',
  }

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, py: 1.5, borderBottom: '1px solid #1e293b' }}>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} spacing={1.5}>
          <Avatar sx={{ bgcolor: '#0ea5e9', width: 36, height: 36, boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)' }}>
            <StyleIcon sx={{ fontSize: '1.25rem' }} />
          </Avatar>
          <Stack spacing={-0.5}>
            <Typography variant='h6' sx={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', fontFamily: '"Outfit", sans-serif' }}>
              eTicket Pro
            </Typography>
            <Typography variant='caption' sx={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.05em' }}>
              ADMINISTRATION
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 1.5, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1e293b', borderRadius: '4px' } }}>
        <List dense={true} disablePadding>
          <ListSubheader disableGutters sx={subheaderStyle}>Configurations de Base</ListSubheader>
          {hasAccess("zones_readers") && renderDrawerItem("zones", "Zones", <CorporateFareIcon fontSize="small" />, "zones")}
          {hasAccess("zones_readers") && renderDrawerItem("readers", "Lecteurs", <QrCodeIcon fontSize="small" />, "readers")}
          {hasAccess("organisation") && renderDrawerItem("departments", "Départements", <AddBusinessIcon fontSize="small" />, "departments")}
          {hasAccess("categories_printables") && renderDrawerItem("categories", "Catégories", <Category fontSize="small" />, "categories")}
          {hasAccess("organisation") && renderDrawerItem("users", "Utilisateurs", <PeopleIcon fontSize="small" />, "users")}
          {hasAccess("tickets") && renderDrawerItem("subscriptions", "Abonnements / PASS", <LocalActivityIcon fontSize="small" />, "subscriptions")}
          {hasAccess("categories_printables") && renderDrawerItem("printables", "Impression", <PrintIcon fontSize="small" />, "printables")}
          {hasAccess("organisation") && renderDrawerItem("smtp", "Configuration SMTP", <MailIcon fontSize="small" />, "smtp")}
          
          <ListSubheader disableGutters sx={subheaderStyle}>Configuration des Billets</ListSubheader>
          {hasAccess("tickets") && renderDrawerItem("tickets", "Tickets", <ConfirmationNumberIcon fontSize="small" />, "tickets")}
          {hasAccess("tickets") && renderDrawerItem("tickets/analytics", "Reporting Billetterie", <AccountTreeIcon fontSize="small" />, "tickets-analytics")}
          
          <ListSubheader disableGutters sx={subheaderStyle}>Gestion du Stock</ListSubheader>
          {hasAccess("stock") && renderDrawerItem("articles", "Articles", <AddShoppingCartIcon fontSize="small" />, "articles")}
          {hasAccess("stock") && renderDrawerItem("supplies", "État du Stock", <WarehouseIcon fontSize="small" />, "supplies")}
          {hasAccess("stock") && renderDrawerItem("supplies/history", "Approvisionnements", <LocalShippingIcon fontSize="small" />, "supplies-history")}
          
          <ListSubheader disableGutters sx={subheaderStyle}>Aide & Support</ListSubheader>
          {renderDrawerItem("help", "Manuel d'utilisation", <MenuBookIcon fontSize="small" />, "help")}
        </List>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #1e293b', backgroundColor: '#090d16' }}>
        {onlineUser && (
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#334155', fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>
              {onlineUser.firstName ? onlineUser.firstName.charAt(0) : 'A'}
            </Avatar>
            <Stack sx={{ overflow: 'hidden' }}>
              <Typography variant="body2" noWrap sx={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.8rem' }}>
                {onlineUser.firstName} {onlineUser.lastName}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                {onlineUser.email}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, 
          ml: { sm: `${DRAWER_WIDTH}px` },
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(12px)', 
          color: '#0f172a', 
          boxShadow: 'none', 
          borderBottom: '1px solid #f1f5f9',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <IconButton color="inherit" edge="start" onClick={ handleDrawerToggle } sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.2rem' }, fontFamily: '"Outfit", sans-serif', color: '#0f172a', letterSpacing: '-0.02em' }}>
            { props.element }
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton 
              color="inherit" 
              onClick={ loadProfileUpdate }
              sx={{ 
                color: '#64748b', 
                transition: 'all 0.2s', 
                '&:hover': { color: '#0ea5e9', backgroundColor: '#f0f9ff' } 
              }}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={logout}
              sx={{ 
                color: '#ef4444', 
                transition: 'all 0.2s', 
                '&:hover': { color: '#dc2626', backgroundColor: '#fef2f2' } 
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer 
          variant="temporary" 
          open={ mobileOpen } 
          onClose={ handleDrawerToggle } 
          ModalProps={{ keepMounted: true }} 
          sx={{ 
            display: { xs: 'block', sm: 'none' }, 
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: 'none',
              boxShadow: '25px 0 50px -12px rgba(0, 0, 0, 0.25)'
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer  
          variant="permanent" 
          sx={{ 
            display: { xs: 'none', sm: 'block' }, 
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: '1px solid #1e293b'
            }
          }} 
          open 
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

NavigationSystem.propTypes = {
  indicator: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired
}
