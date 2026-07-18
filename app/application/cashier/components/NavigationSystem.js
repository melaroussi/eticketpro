"use client"
import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

/** Icons import */
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import StyleIcon from '@mui/icons-material/Style'

/** Hooks Imports */
import { useRouter } from 'next/navigation'

export default function NavigationSystem(props) {
  const router = useRouter()
  let [onlineUser, setOnlineUser] = React.useState(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem("user")
      if (user) {
        setOnlineUser(JSON.parse(user))
      }
    }
  }, [])

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("user")
    }
    router.push("/application/")
  }

  const renderNavItem = (target, label, activeKey) => {
    const isActive = props.indicator === activeKey
    return (
      <Button 
        onClick={(e) => handleLinks(e, target)} 
        sx={{ 
          my: 1.5, 
          mx: 0.5,
          color: isActive ? '#0ea5e9' : '#475569', 
          display: 'block',
          fontWeight: isActive ? 700 : 500,
          fontSize: '0.85rem',
          textTransform: 'none',
          borderRadius: '20px',
          px: 2,
          py: 0.5,
          backgroundColor: isActive ? '#f0f9ff' : 'transparent',
          transition: 'all 0.2s ease',
          border: isActive ? '1px solid #e0f2fe' : '1px solid transparent',
          '&:hover': {
            backgroundColor: isActive ? '#e0f2fe' : '#f8fafc',
            color: isActive ? '#0284c7' : '#0f172a',
          }
        }} 
      >
        {label}
      </Button>
    )
  }

  return (
    <AppBar 
      position="fixed"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: 'none',
        color: '#0f172a',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ cursor: 'pointer' }} onClick={(e) => handleLinks(e, "cashier")}>
            <Avatar sx={{ bgcolor: '#0ea5e9', width: 34, height: 34 }}>
              <StyleIcon sx={{ fontSize: '1.15rem' }} />
            </Avatar>
            <Typography 
              variant="h6" 
              noWrap 
              sx={{ 
                fontWeight: 750, 
                fontSize: '1.05rem', 
                letterSpacing: '-0.02em', 
                fontFamily: '"Outfit", sans-serif',
                background: 'linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              eTicket Pro
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            {renderNavItem("cashier/tickets", "Billetterie", "tickets")}
            {renderNavItem("cashier/graphics", "Vente Graphique", "graphics")}
            {renderNavItem("cashier/articles/add-sell", "Boutique", "articles")}
            {renderNavItem("cashier/parking/add-sell", "Parking", "parking")}
            {renderNavItem("cashier/reports", "Rapports de Clôture", "reports")}
            {onlineUser && renderNavItem(`cashier/reports/printable/cashier-daily-report?id=${onlineUser.id}`, "Mon PV Journalier", "daily-report")}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {onlineUser && (
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600, color: '#475569', fontSize: '0.8rem' }}>
                {onlineUser.firstName} {onlineUser.lastName} (Caissier)
              </Typography>
            )}
            <IconButton 
              color="inherit" 
              onClick={(e) => handleLinks(e, "cashier/profile")}
              sx={{ 
                color: '#64748b', 
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
                '&:hover': { color: '#dc2626', backgroundColor: '#fef2f2' } 
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

NavigationSystem.propTypes = {
  indicator: PropTypes.string,
  element: PropTypes.string
}
