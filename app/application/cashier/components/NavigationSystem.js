"use client"
import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
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
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

/** Icons import */
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew'
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

/** Hooks Imports */
import { useRouter } from 'next/navigation'

export default function NavigationSystem(props) {

  const router = useRouter()

  let [onlineUser, setOnlineUser] = React.useState("XX")

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
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={(e)=>handleLinks(e, "cashier/tickets")} sx={{ my: 2, color: 'white', display: 'block' }} >
              Billeterie
            </Button>
            <Button onClick={(e)=>handleLinks(e, "cashier/graphics")} sx={{ my: 2, color: 'white', display: 'block' }} >
              Vente Graphique
            </Button>
            <Button onClick={(e)=>handleLinks(e, "cashier/articles")} sx={{ my: 2, color: 'white', display: 'block' }} >
              Boutique
            </Button>
            <Button onClick={(e)=>handleLinks(e, "cashier/parking")} sx={{ my: 2, color: 'white', display: 'block' }} >
              Parking
            </Button>
            <Button onClick={(e)=>handleLinks(e, "cashier/reports")} sx={{ my: 2, color: 'white', display: 'block' }} >
              PV Journalier Global
            </Button>
            <Button onClick={(e)=>handleLinks(e, "cashier/reports/printable/cashier-daily-report?id=2")} sx={{ my: 2, color: 'white', display: 'block' }} >
              PV Journalier Partiel
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" edge="end" onClick={(e)=>handleLinks(e, "cashier/profile")} sx={{ mr: 1 }}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" edge="end" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
