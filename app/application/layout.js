"use client"
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ea5e9', // Sky blue
      light: '#e0f2fe',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6366f1', // Indigo
      light: '#e0e7ff',
      dark: '#4f46e5',
    },
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#475569', // Slate 600
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 800, fontFamily: '"Outfit", sans-serif' },
    h2: { fontWeight: 800, fontFamily: '"Outfit", sans-serif' },
    h3: { fontWeight: 700, fontFamily: '"Outfit", sans-serif' },
    h4: { fontWeight: 700, fontFamily: '"Outfit", sans-serif' },
    h5: { fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
    h6: { fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
    button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' },
    body1: { fontFamily: '"Inter", sans-serif' },
    body2: { fontFamily: '"Inter", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid #f1f5f9',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8fafc',
          '& .MuiTableCell-root': {
            color: '#475569',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #e2e8f0',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '14px 18px',
          borderBottom: '1px solid #f1f5f9',
          color: '#334155',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
          '&:last-child .MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
