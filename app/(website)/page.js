"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Footer from './sections/footer';
import Subscribe from './sections/subscribe';
import Somayar from './sections/somayar';
import Home from './sections/home';
import Contact from './sections/contact';
import Navigation from './sections/navigation';
import Pricing from './sections/pricing';
import Biozones from './sections/biozones';

import { createTheme } from '@mui/material/styles';

export default function Album() {

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#0f172a', // Imperial Midnight Slate / Deep Navy
        light: '#1e293b', // Refined Slate
        dark: '#020617', // Obsidian Black
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#d97706', // Imperial Gold & Bronze
        light: '#f59e0b', // Warm Amber
        dark: '#b45309', // Deep Bronze
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8fafc', // Marble Alabaster
        paper: '#ffffff',
      },
      text: {
        primary: '#0f172a', // Slate 900
        secondary: '#475569', // Slate 600
      },
    },
    typography: {
      fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            padding: '10px 22px',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-2px)',
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#1e293b',
              boxShadow: '0 10px 20px -10px rgba(15, 23, 42, 0.4)',
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: '#b45309',
              boxShadow: '0 10px 20px -10px rgba(217, 119, 6, 0.4)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 8px -1px rgba(15, 23, 42, 0.02)',
            border: '1px solid rgba(229, 231, 235, 0.6)',
            overflow: 'hidden',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Navigation/>
      <Box position="relative" component={"main"} sx={{ paddingY: 0, backgroundColor: 'background.default' }} >
        <Home/>
        <Pricing/>
        <Biozones/>
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