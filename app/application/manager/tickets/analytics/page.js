"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Stack, useTheme, CardContent, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

// Icon imports
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import NavigationSystem from '../../components/NavigationSystem';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const moment = require("moment"); 

const DRAWER_WIDTH = 250;
const TABLE_ROWS_PER_PAGE = 10;

// Curated theme colors for Donut/Pie Charts
const CHART_COLORS_PRIMARY = ['#065f46', '#0ea5e9', '#d97706', '#6366f1', '#ec4899', '#f59e0b', '#10b981'];

export default function Dashboard() {
  /** KPIs */
  let [yearSells, setYearSells] = React.useState(0)
  let [monthSells, setMonthSells] = React.useState(0)
  let [daySells, setDaySells] = React.useState(0)
  let [yearTurnover, setYearTurnover] = React.useState(0)
  let [monthTurnover, setMonthTurnover] = React.useState(0)
  let [dayTurnover, setDayTurnover] = React.useState(0)

  /** Datetime Filters */
  let [startDatetime, setStartDatetime] = React.useState("")
  let [stopDatetime, setStopDatetime] = React.useState("")
  
  /** Chart Data */
  let [sellsByType, setSellsByType] = React.useState([])
  let [sellsByCategory, setSellsByCategory] = React.useState([])
  let [turnoverByType, setTurnoverByType] = React.useState([])
  let [turnoverByCategory, setTurnoverByCategory] = React.useState([])

  /** Ticket List */
  let [sells, setSells] = React.useState([])
  /** Selected Ticket Page */
  let [selectedTicketsPage, setSelectedTicketsPage] = React.useState(0)

  /** Handlers */
  const handlePageChange = function(event, page){
    setSelectedTicketsPage(page)
  }

  const handleStartDatetime = function(event){
    setStartDatetime(event.target.value)
  }

  const handleStopDatetime = function(event){
    setStopDatetime(event.target.value)
  }

  /** Fetch functions */
  const loadKpis = () => {
    const OPTIONS = { method: "GET" };

    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=year-sells"), OPTIONS).then(res => res.json()).then(data => {
      setYearSells(data.result && data.result[0] ? data.result[0].sellsNumber : 0)
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=month-sells"), OPTIONS).then(res => res.json()).then(data => {
      setMonthSells(data.result && data.result[0] ? data.result[0].sellsNumber : 0)
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=day-sells"), OPTIONS).then(res => res.json()).then(data => {
      setDaySells(data.result && data.result[0] ? data.result[0].sellsNumber : 0)
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=year-turnover"), OPTIONS).then(res => res.json()).then(data => {
      setYearTurnover(data.result && data.result[0] ? data.result[0].turnover : 0)
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=month-turnover"), OPTIONS).then(res => res.json()).then(data => {
      setMonthTurnover(data.result && data.result[0] ? data.result[0].turnover : 0)
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=day-turnover"), OPTIONS).then(res => res.json()).then(data => {
      setDayTurnover(data.result && data.result[0] ? data.result[0].turnover : 0)
    })

    // Fetch distributions
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=sells-by-type"), OPTIONS).then(res => res.json()).then(data => {
      if (data.result) {
        const list = data.result.map((item, key) => ({
          id: key,
          value: item.sellsNumber,
          label: item.type || "Autre"
        }));
        setSellsByType(list);
      }
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=sells-by-category"), OPTIONS).then(res => res.json()).then(data => {
      if (data.result) {
        const list = data.result.map((item, key) => ({
          id: key,
          value: item.sellsNumber,
          label: item.category || "Autre"
        }));
        setSellsByCategory(list);
      }
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=turnover-by-category"), OPTIONS).then(res => res.json()).then(data => {
      if (data.result) {
        const list = data.result.map((item, key) => ({
          id: key,
          value: item.turnover,
          label: item.category || "Autre"
        }));
        setTurnoverByCategory(list);
      }
    })
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/analytics?query=turnover-by-type"), OPTIONS).then(res => res.json()).then(data => {
      if (data.result) {
        const list = data.result.map((item, key) => ({
          id: key,
          value: item.turnover,
          label: item.type || "Autre"
        }));
        setTurnoverByType(list);
      }
    })
  };

  const init = function(event){
    if (event) event.preventDefault()
    setStartDatetime("")
    setStopDatetime("")

    const OPTIONS = { method: "GET" }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells"), OPTIONS).then(res => res.json()).then(data => {
      setSells(data.result || [])
    })
  }

  const filterButtonIsDisabled = function(){
    if (startDatetime && stopDatetime){
      let _startDatetime = new Date(startDatetime)
      let _stopDatetime = new Date(stopDatetime)
      if (_startDatetime <= _stopDatetime) return false
    }
    return true
  }

  const filter = function(event){
    event.preventDefault()
    const OPTIONS = { method: "GET" }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells"), OPTIONS).then(res => res.json()).then(data => {
      if (data.result){
        let _startDatetime = new Date(startDatetime)
        // Set end datetime to 23:59:59 to capture full day
        let _stopDatetime = new Date(stopDatetime)
        _stopDatetime.setHours(23, 59, 59, 999)
        
        setSells(data.result.filter(function(item){
          let _sellDatetime = new Date(item.datetime)
          return _sellDatetime >= _startDatetime && _sellDatetime <= _stopDatetime
        }))
      }
    })
  }

  // Real CSV Exporter
  const download = function(event){
    event.preventDefault()
    if (sells.length === 0) return;
    
    const headers = ["ID Vente", "Categorie", "Type", "Prix (DH)", "Date Vente", "Impression", "Statut", "Scans Autorises", "Scans Effectues"];
    const rows = sells.map(row => [
      row.id,
      row.category || "Autre",
      row.type || "Autre",
      row.price,
      moment(row.datetime).format("DD/MM/YYYY HH:mm:ss"),
      row.printed ? "Oui" : "Non",
      row.canceled ? "Annule" : "Actif",
      row.allowedScanNumber,
      row.scanNumber || 0
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Excel UTF-8 support
    csvContent += [headers.join(";"), ...rows.map(e => e.join(";"))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rapport_billetterie_${moment().format("YYYY-MM-DD")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /** Run hooks */
  React.useEffect(function(){
    loadKpis();
    init();
  }, [])

  // Calculate monthly stats from loaded sells list
  const getMonthlySalesData = React.useMemo(() => {
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const currentYear = new Date().getFullYear();
    
    const data = months.map((m, index) => ({
      month: m,
      turnover: 0,
      sells: 0
    }));

    sells.forEach(item => {
      const d = new Date(item.datetime);
      if (d.getFullYear() === currentYear) {
        const mIdx = d.getMonth();
        data[mIdx].sells += 1;
        data[mIdx].turnover += parseFloat(item.price || 0);
      }
    });

    return data;
  }, [sells]);

  // Overall sums helper
  const totalScansPerformed = sells.reduce((acc, row) => acc + (row.scanNumber || 0), 0);
  const totalScansAllowed = sells.reduce((acc, row) => acc + (row.allowedScanNumber || 0), 0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"tickets-analytics"} element={"Analyse & Reporting Billetterie"}/>

      <Box 
        component="main" 
        sx={{ 
          backgroundColor: '#f8fafc', 
          flexGrow: 1, 
          p: { xs: 2, sm: 4 }, 
          width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} 
        }}
      >
        <Toolbar />
        
        {/** Premium Heading Panel */}
        <Box 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, #065f46 0%, #043e2e 100%)', 
            color: '#ffffff',
            boxShadow: '0 10px 15px -3px rgba(6, 95, 70, 0.2)'
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
                Tableau de Bord & Reporting de Billetterie
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                Suivez en temps réel le chiffre d'affaires, les volumes de ventes de tickets et l'état des scans physiques aux portiques du Zoo National de Rabat.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button 
                variant="contained" 
                startIcon={<RefreshIcon />}
                onClick={() => { loadKpis(); init(); }}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    boxShadow: 'none'
                  }
                }}
              >
                Rafraîchir
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {/** 6 KPI Cards Grid */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      Ventes Annuelles (Volume)
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#0f172a' }}>
                      {yearSells}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(6, 95, 70, 0.1)', color: '#065f46', width: 48, height: 48 }}>
                    <LocalActivityIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      Ventes Mensuelles (Volume)
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#0f172a' }}>
                      {monthSells}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', width: 48, height: 48 }}>
                    <CalendarMonthIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      Ventes du Jour (Volume)
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#0f172a' }}>
                      {daySells}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(217, 119, 6, 0.1)', color: '#d97706', width: 48, height: 48 }}>
                    <TodayIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      C.A. Annuel
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#065f46' }}>
                      {yearTurnover.toLocaleString('fr-FR')} <Typography variant="caption" component="span" sx={{ fontWeight: 700 }}>MAD</Typography>
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(6, 95, 70, 0.1)', color: '#065f46', width: 48, height: 48 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      C.A. du Mois
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#0ea5e9' }}>
                      {monthTurnover.toLocaleString('fr-FR')} <Typography variant="caption" component="span" sx={{ fontWeight: 700 }}>MAD</Typography>
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', width: 48, height: 48 }}>
                    <TrendingUpIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                      C.A. du Jour
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, fontFamily: '"Outfit", sans-serif', color: '#d97706' }}>
                      {dayTurnover.toLocaleString('fr-FR')} <Typography variant="caption" component="span" sx={{ fontWeight: 700 }}>MAD</Typography>
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(217, 119, 6, 0.1)', color: '#d97706', width: 48, height: 48 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/** Monthly Trend Charts Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#0f172a' }}>
                Évolution Mensuelle du Chiffre d'Affaires
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Revenus cumulés (DH) par mois pour l'année en cours ({new Date().getFullYear()}).
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <BarChart
                  dataset={getMonthlySalesData}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[
                    { dataKey: 'turnover', label: 'Chiffre d\'Affaire (DH)', color: '#065f46' }
                  ]}
                  height={300}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#0f172a' }}>
                Volume Mensuel des Ventes
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Nombre total de billets émis par mois pour l'année en cours ({new Date().getFullYear()}).
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                  dataset={getMonthlySalesData}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[
                    { dataKey: 'sells', label: 'Volume (Unités)', color: '#d97706' }
                  ]}
                  height={300}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/** Pie/Donut Charts Section */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Chiffre d'Affaires par Type de Ticket
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Répartition financière par type de ticket (Adulte, Enfant, etc.)
              </Typography>
              {turnoverByType.length > 0 ? (
                <PieChart
                  colors={CHART_COLORS_PRIMARY}
                  series={[
                    {
                      data: turnoverByType,
                      innerRadius: 60,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' },
                    },
                  }}
                  width={400}
                  height={260}
                />
              ) : (
                <Typography variant="body2" sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>Aucune donnée disponible</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Volume par Catégorie de Ticket
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Répartition des ventes par catégorie de visiteur
              </Typography>
              {sellsByCategory.length > 0 ? (
                <PieChart
                  colors={CHART_COLORS_PRIMARY}
                  series={[
                    {
                      data: sellsByCategory,
                      innerRadius: 60,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' },
                    },
                  }}
                  width={400}
                  height={260}
                />
              ) : (
                <Typography variant="body2" sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>Aucune donnée disponible</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Chiffre d'Affaires par Catégorie
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Contribution financière de chaque catégorie au chiffre d'affaires
              </Typography>
              {turnoverByCategory.length > 0 ? (
                <PieChart
                  colors={CHART_COLORS_PRIMARY}
                  series={[
                    {
                      data: turnoverByCategory,
                      innerRadius: 60,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' },
                    },
                  }}
                  width={400}
                  height={260}
                />
              ) : (
                <Typography variant="body2" sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>Aucune donnée disponible</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Volume par Type de Ticket
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Répartition des ventes selon la tarification émise
              </Typography>
              {sellsByType.length > 0 ? (
                <PieChart
                  colors={CHART_COLORS_PRIMARY}
                  series={[
                    {
                      data: sellsByType,
                      innerRadius: 60,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 6,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' },
                    },
                  }}
                  width={400}
                  height={260}
                />
              ) : (
                <Typography variant="body2" sx={{ py: 5, textAlign: 'center', color: 'text.secondary' }}>Aucune donnée disponible</Typography>
              )}
            </Paper>
          </Grid>

          {/** Filters Panel */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <FilterAltIcon color="primary" />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Filtrer par Intervalle de Dates
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sélectionnez une période temporelle pour affiner le tableau ci-dessous.
                  </Typography>
                </Box>
              </Stack>
              
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    value={startDatetime} 
                    onChange={handleStartDatetime} 
                    variant="outlined" 
                    type="date" 
                    size="small" 
                    label="Date de Début" 
                    required 
                    fullWidth 
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    value={stopDatetime} 
                    onChange={handleStopDatetime} 
                    variant="outlined" 
                    type="date" 
                    size="small" 
                    label="Date de Fin" 
                    required 
                    fullWidth 
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  onClick={filter} 
                  disabled={filterButtonIsDisabled()}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Appliquer le filtre
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={init}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Réinitialiser
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/** Data Table Card */}
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Journal Détaillé des Ventes
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Liste des transactions de tickets. {sells.length} ticket(s) trouvé(s).
                  </Typography>
                </Box>
                <Button 
                  disabled={sells.length === 0} 
                  variant="contained" 
                  color="success"
                  startIcon={<FileDownloadIcon />}
                  onClick={download}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  Exporter en CSV
                </Button>
              </Box>
              <Divider />
              <Table size="medium">
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>ID Billet</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Catégorie</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Prix (DH)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date de Vente</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Impression</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Statut</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">Portique Scans</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">Effectués</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sells.length > 0 ? (
                    sells
                      .slice(selectedTicketsPage * TABLE_ROWS_PER_PAGE, (selectedTicketsPage + 1) * TABLE_ROWS_PER_PAGE)
                      .map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontWeight: 600 }}>#{row.id}</TableCell>
                          <TableCell>{row.category || "Autre"}</TableCell>
                          <TableCell>{row.type || "Autre"}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#065f46' }}>{row.price} DH</TableCell>
                          <TableCell>{moment(row.datetime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                          <TableCell>
                            {row.printed ? (
                              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#16a34a' }}>
                                <CheckCircleIcon fontSize="inherit" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>Oui</Typography>
                              </Stack>
                            ) : (
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Non</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.canceled ? (
                              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#dc2626' }}>
                                <CancelIcon fontSize="inherit" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>Annulé</Typography>
                              </Stack>
                            ) : (
                              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#2563eb' }}>
                                <CheckCircleIcon fontSize="inherit" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>Actif</Typography>
                              </Stack>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Typography sx={{ fontWeight: 600 }}>
                              {row.allowedScanNumber} scan(s)
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                              <QrCodeScannerIcon fontSize="small" color={row.scanNumber > 0 ? "primary" : "action"} />
                              <Typography sx={{ fontWeight: 700, color: row.scanNumber >= row.allowedScanNumber ? '#dc2626' : '#2563eb' }}>
                                {row.scanNumber || 0}
                              </Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Aucun ticket de vente disponible pour cette sélection.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[TABLE_ROWS_PER_PAGE]}
                count={sells.length}
                component="div"
                rowsPerPage={TABLE_ROWS_PER_PAGE}
                page={selectedTicketsPage}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
