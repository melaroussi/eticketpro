"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid, Stack, Paper, Button, Card, CardContent, Avatar, Chip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Icons Import
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TodayIcon from '@mui/icons-material/Today';

import { useRouter } from 'next/navigation';
import NavigationSystem from './components/NavigationSystem';

const moment = require("moment");
const DRAWER_WIDTH = 270;

export default function Dashboard() {
  const router = useRouter();

  let [onlineUser, setOnlineUser] = React.useState(null);
  let [stats, setStats] = React.useState(null);
  let [loading, setLoading] = React.useState(true);

  const fetchDashboardData = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const response = await fetch(`/api/manager/dashboard?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      const json = await response.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (e) {
      console.error("Failed to load dashboard metrics", e);
    } finally {
      setLoading(false);
    }
  };

  /** Getting Online User from Session and Route Protection with Auto-Refresh */
  React.useEffect(function(){
    const user = sessionStorage.getItem("user");
    if (!user) {
      router.replace("/application");
    } else {
      setOnlineUser(JSON.parse(user));
      fetchDashboardData(true);

      // Live auto-refresh every 10 seconds
      const interval = setInterval(() => {
        fetchDashboardData(false);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [router])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"manager-welcome"} element={"Tableau de Bord"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        
        {/** Welcome and Header Section */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 4 }}>
          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Rapport d'Activité
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Suivi en direct des ventes et des accès au Zoo National de Rabat.
            </Typography>
          </Stack>
          <Button 
            onClick={fetchDashboardData} 
            variant="outlined" 
            color="primary" 
            startIcon={<RefreshIcon />}
            sx={{ borderRadius: '20px', textTransform: 'none', px: 3, py: 1 }}
          >
            Actualiser
          </Button>
        </Stack>

        {/** KPI Grid Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/** Card 1: Chiffre d'Affaires */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #0ea5e9' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Chiffre d'Affaires Global
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {loading ? "..." : (stats?.totalSales || 0)} DH
                    </Typography>
                  </Stack>
                  <Avatar sx={{ bgcolor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', width: 48, height: 48 }}>
                    <MonetizationOnIcon />
                  </Avatar>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 2 }}>
                  <ArrowUpwardIcon sx={{ color: '#10b981', fontSize: '0.9rem' }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +12.5%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    vs semaine dernière
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/** Card 2: Entrées / Scans */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #10b981' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Visiteurs Entrés (Scans)
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {loading ? "..." : (stats?.totalScans || 0)}
                    </Typography>
                  </Stack>
                  <Avatar sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: 48, height: 48 }}>
                    <QrCodeScannerIcon />
                  </Avatar>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 2 }}>
                  <TodayIcon sx={{ color: '#64748b', fontSize: '0.9rem' }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Mises à jour instantanées
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/** Card 3: Abonnements Actifs */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #6366f1' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Abonnés Actifs (PASS)
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {loading ? "..." : (stats?.activePass || 0)}
                    </Typography>
                  </Stack>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', width: 48, height: 48 }}>
                    <CardMembershipIcon />
                  </Avatar>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    PASS Annuel Actif
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/** Card 4: Alerte Stock */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #f59e0b' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack spacing={1}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Articles en Alerte Stock
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#ef4444' }}>
                      {loading ? "..." : (stats?.lowStockCount || 0)}
                    </Typography>
                  </Stack>
                  <Avatar sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', width: 48, height: 48 }}>
                    <WarningIcon />
                  </Avatar>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 600 }}>
                    Stock &lt; 10 articles
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/** Main Content: Recent Sales and Live Gate Activity */}
        <Grid container spacing={3}>
          {/** Left Column: Recent Ticket Sales */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2.5, fontFamily: '"Outfit", sans-serif' }}>
                Ventes de Billets Récentes
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date & Heure</TableCell>
                      <TableCell align="left">Catégorie</TableCell>
                      <TableCell align="left">Type</TableCell>
                      <TableCell align="left">Prix</TableCell>
                      <TableCell align="left">Caissier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>Chargement des données...</TableCell>
                      </TableRow>
                    ) : (Array.isArray(stats?.recentSales) && stats.recentSales.length > 0) ? (
                      stats.recentSales.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="left">{moment(row.datetime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                          <TableCell align="left">
                            <Chip size="small" label={row.category} sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '0.75rem' }} />
                          </TableCell>
                          <TableCell align="left">{row.type || "Ticket Standard"}</TableCell>
                          <TableCell align="left" sx={{ fontWeight: 700 }}>{row.price} DH</TableCell>
                          <TableCell align="left">{row.firstName} {row.lastName}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>Aucune vente enregistrée.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/** Right Column: Live Gate Scans */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 2.5, fontFamily: '"Outfit", sans-serif' }}>
                Flux d'Accès aux Portes
              </Typography>
              <Stack spacing={2}>
                {loading ? (
                  <Typography align="center" color="text.secondary" sx={{ py: 4 }}>Chargement du flux...</Typography>
                ) : (Array.isArray(stats?.recentScans) && stats.recentScans.length > 0) ? (
                  stats.recentScans.map((row) => (
                    <Box 
                      key={row.id} 
                      sx={{ 
                        p: 2, 
                        borderRadius: '8px', 
                        backgroundColor: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateX(5px)', borderColor: '#e2e8f0' }
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack spacing={0.5}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                            {row.zoneLabel || "Porte Principale"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {moment(row.datetime).format("DD/MM/YYYY HH:mm:ss")}
                          </Typography>
                        </Stack>
                        <Chip 
                          size="small" 
                          label={row.status === "Accepté" ? "Accepté" : "Refusé"} 
                          color={row.status === "Accepté" ? "success" : "error"} 
                          sx={{ fontWeight: 700, fontSize: '0.7rem', borderRadius: '4px' }}
                        />
                      </Stack>
                    </Box>
                  ))
                ) : (
                  <Typography align="center" color="text.secondary" sx={{ py: 4 }}>Aucun scan récent.</Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
