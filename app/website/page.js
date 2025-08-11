"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/system';
import Footer from './sections/footer';
import Subscribe from './sections/subscribe';
import Somayar from './sections/somayar';
import Home from './sections/home';
import Contact from './sections/contact';
import Navigation from './sections/navigation';


import { createTheme } from '@mui/material/styles';

export default function Album() {

  const customTheme = createTheme({});

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Navigation/>
      <Box position="relative" component={"main"} sx={{paddingY: 0}} >
        <Home/>
        <Somayar/>
        <Subscribe/>
        <Contact/>
      </Box>
      {/* Footer */}
      <Footer/>
      {/* End footer */}
    </ThemeProvider>
  );
}