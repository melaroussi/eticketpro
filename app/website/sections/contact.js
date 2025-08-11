"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import Masonry from '@mui/lab/Masonry';

import Chip from '@mui/material/Chip';

import { green, red, grey, yellow, blue } from '@mui/material/colors';
import { Email, EmailOutlined, WhatsApp } from '@mui/icons-material';

export default function Contact() {
  let [emailAdress, setEmailAdress] = React.useState()
  let [fullName, setFullName] = React.useState()
  let [contactReason, setContactReason] = React.useState()
  let [message, setMessage] = React.useState()
  
  const handleEmailAdress = function(event){
    setEmailAdress(event.target.value)
  }

  const handleFullName = function(event){
    setFullName(event.target.value)
  }

  const handleContactReason = function(event){
    setContactReason(event.target.value)
  }

  const handleMessage = function(event){
    setMessage(event.target.value)
  }

  const send = function(event){
    alert("Send")
  }

  const reasons = [
    {
      key: "R01",
      value: "Need more sells",
      label: "Marketing Service"
    },
    {
      key: "R02",
      value: "I need a professional website for my organization",
      label: "Website Design"
    },
    {
      key: "R03",
      value: "I want to develope an AI based solution",
      label: "AI Solution"
    },
    {
      key: "R04",
      value: "I want to organize my business",
      label: "Business Process Design"
    },
  ]
  
  return (
    <Box component={"section"} id="contact-section" sx={{height: "100%"}}>
      <Container sx={{ py: 8 }} maxWidth="md" >
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item sm={12} md={12} >
            <Typography component="h1" variant="h4">
              N'hésitez pas à nous contacter
            </Typography>
            <Typography variant="body2" component={"p"} paragraph>
              Chers visiteurs,
              Nous apprécions votre engagement et sommes ravis de vous offrir plusieurs moyens de communication. Que vous préfériez la praticité de WhatsApp, l'efficacité de l'e-mail ou la simplicité du formulaire de contact sur notre site web, nous sommes là pour vous aider. N'hésitez pas à nous contacter via WhatsApp, à nous envoyer un e-mail, ou à soumettre directement vos questions via le formulaire sur notre site web. Nous sommes impatients de vous entendre et de vous aider de toutes les manières possibles.
              Meilleures salutations,
            </Typography>
            <Typography variant="h6" paragraph>
              Nous sommes joignables par e-mail et WhatsApp:
            </Typography>
            <Chip sx={{ mt: 1, mr: 1, py:2, px: 1, backgroundColor: grey[900], color: grey[50] }} icon={<EmailOutlined color={grey[50]}/>} label="Email: contact@somayar.com" size="medium"/>
            <Chip sx={{ mt: 1, mr: 1, py:2, px: 1, backgroundColor: grey[900], color: grey[50] }} icon={<WhatsApp color={grey[50]}/>} label="WhatsApp: (+212) 6XX-XXXXXX" size="medium"/>
          </Grid>
        
        </Grid>
      </Container> 
    </Box>
  )
}