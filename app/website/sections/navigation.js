import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import AllInboxIcon from '@mui/icons-material/AllInbox'
import StyleIcon from '@mui/icons-material/Style'

import { useRouter } from 'next/navigation'
import { Avatar } from '@mui/material';

import { blue, grey } from "@mui/material/colors"

export default function Section() {
  const router = useRouter()

  const scrollTo = function(sectionId) {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  }

  const loadLoginPage = function(event) {
    event.preventDefault()
    router.push("/application/")
  }

  return (
    <AppBar position="fixed" color='inherit'>
      <Container maxWidth="md" disableGutters> 
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: {  xs: 'none', md: 'flex' } }}>
            <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
              <Avatar sx={{ bgcolor: grey[900], ml: 2, mr: 1}} >
                <StyleIcon />
              </Avatar>
              <Typography variant='h6' sx={{ ml: 0}}>eTicket Pro</Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1, display: {  xs: 'none', md: 'flex' } }}>
            <Button onClick={()=>scrollTo("home-section")} sx={{ my: 2, color: 'inherit', display: 'block' }}>
              A Propos
            </Button>
            <Button onClick={()=>scrollTo("somayar-section")} sx={{ my: 2, color: 'inherit', display: 'block' }}>
              Somayar
            </Button>
            <Button onClick={()=>scrollTo("subscribe-section")} sx={{ my: 2, color: 'inherit', display: 'block' }}>
              Nouveau Compte
            </Button>
            <Button onClick={()=>scrollTo("contact-section")} sx={{ my: 2, color: 'inherit', display: 'block' }}>
              Contactez-nous
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: {  xs: 'flex', md: 'flex' } }}>
            <Button variant="contained" onClick={(e)=>loadLoginPage(e)} sx={{ my: 2, display: 'block' }}>
              Connexion
            </Button>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  )
}