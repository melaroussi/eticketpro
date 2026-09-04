"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AlertTitle, Grid, Stack, Select, MenuItem, InputLabel, FormControl, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { blue, grey } from "@mui/material/colors";
import { useRouter } from 'next/navigation';
import NavigationSystem from "../components/NavigationSystem";

const DRAWER_WIDTH = 250;
const QRCode = require('qrcode');

export default function SubscriptionsPage() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState("");
  const [selectedPassType, setSelectedPassType] = React.useState("Adulte");

  const [createdPass, setCreatedPass] = React.useState(null);
  const [qrCodeUrl, setQrCodeUrl] = React.useState("");

  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [validationAlert, setValidationAlert] = React.useState(false);

  const loadData = () => {
    // Load subscriptions
    fetch("/api/pass-subscriptions")
      .then(res => res.json())
      .then(data => {
        if (data.result) setSubscriptions(data.result);
      })
      .catch(err => console.error("Error loading subscriptions:", err));

    // Load users
    fetch("/api/users?operation=get-all")
      .then(res => res.json())
      .then(data => {
        if (data.result) setUsers(data.result);
      })
      .catch(err => console.error("Error loading users:", err));
  };

  React.useEffect(() => {
    const loggedUser = sessionStorage.getItem("user");
    if (!loggedUser) {
      router.replace("/application");
      return;
    }
    loadData();
  }, [router]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!selectedUserId || !selectedPassType) {
      setValidationAlert(true);
      return;
    }

    try {
      const response = await fetch("/api/pass-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUserId,
          passType: selectedPassType
        })
      });

      const data = await response.json();
      if (response.ok && data.result) {
        setSuccessAlert(true);
        loadData();
        const newPass = {
          qrCode: data.result.qrCode,
          startDate: data.result.startDate,
          endDate: data.result.endDate,
          passType: selectedPassType,
          user: users.find(u => u.id === selectedUserId)
        };
        setCreatedPass(newPass);

        // Generate QR code URL
        QRCode.toDataURL(newPass.qrCode, (err, url) => {
          if (!err) setQrCodeUrl(url);
        });

        setSelectedUserId("");
        setTimeout(() => setSuccessAlert(false), 5000);
      } else {
        setErrorAlert(true);
      }
    } catch (err) {
      console.error("Failed to create subscription:", err);
      setErrorAlert(true);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("pass-printable-card").innerHTML;
    const windowUrl = 'about:blank';
    const uniqueName = new Date();
    const windowName = 'Print' + uniqueName.getTime();
    const prtWindow = window.open(windowUrl, windowName,
      'left=100,top=100,right=100,bottom=100,width=400,height=600');
    prtWindow.document.write(`
      <html>
        <head>
          <title>Imprimer le PASS</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { width: 320px; border: 2px solid #333; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .header { font-weight: bold; font-size: 20px; color: #1e3a8a; margin-bottom: 5px; }
            .subtitle { font-size: 12px; color: #666; margin-bottom: 20px; }
            .qr { width: 180px; height: 180px; margin: 0 auto 20px; }
            .details { font-size: 14px; margin-bottom: 8px; text-align: left; }
            .footer { font-size: 10px; color: #999; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
          </style>
        </head>
        <body onload="window.print();window.close();">
          <div class="card">
            ${printContent}
          </div>
        </body>
      </html>
    `);
    prtWindow.document.close();
    prtWindow.focus();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"subscriptions"} element={"Abonnements / PASS"} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Create subscription */}
            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardHeader 
                  avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} 
                  title="Créer un Abonnement PASS" 
                  subheader="Générer un PASS annuel pour un utilisateur"
                />
                <CardContent>
                  <Stack spacing={3}>
                    <Collapse in={validationAlert}>
                      <Alert severity="warning" action={<IconButton color="inherit" size="small" onClick={() => setValidationAlert(false)}> <CloseIcon fontSize="inherit" /> </IconButton>} >
                        Sélectionnez un utilisateur et un type de PASS.
                      </Alert>
                    </Collapse>

                    <Collapse in={successAlert}>
                      <Alert severity="success" action={<IconButton color="inherit" size="small" onClick={() => setSuccessAlert(false)}> <CloseIcon fontSize="inherit" /> </IconButton>} >
                        PASS créé avec succès !
                      </Alert>
                    </Collapse>

                    <FormControl fullWidth size="small">
                      <InputLabel id="user-select-label">Utilisateur / Client</InputLabel>
                      <Select
                        labelId="user-select-label"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        label="Utilisateur / Client"
                      >
                        {users.map(u => (
                          <MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id="pass-type-label">Type de PASS</InputLabel>
                      <Select
                        labelId="pass-type-label"
                        value={selectedPassType}
                        onChange={(e) => setSelectedPassType(e.target.value)}
                        label="Type de PASS"
                      >
                        <MenuItem value="Adulte">PASS Adulte</MenuItem>
                        <MenuItem value="Enfant">PASS Enfant</MenuItem>
                        <MenuItem value="Famille">PASS Famille</MenuItem>
                        <MenuItem value="Jeune">PASS Jeune</MenuItem>
                      </Select>
                    </FormControl>

                    <Button variant="contained" onClick={handleCreate} fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                      Créer le PASS
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Printable card preview */}
              {createdPass && (
                <Card sx={{ mt: 3, borderRadius: 3, border: '1px solid #ddd', boxShadow: 'none' }}>
                  <CardContent>
                    <Box id="pass-printable-card" sx={{ textAlign: 'center', p: 1 }}>
                      <div className="header" style={{ fontWeight: 'bold', fontSize: '17px', color: '#0f172a', marginBottom: '5px' }}>MUSÉE DES ARTS & CIVILISATIONS</div>
                      <div className="subtitle" style={{ fontSize: '12px', color: '#b45309', fontWeight: 700, marginBottom: '15px' }}>PASS CULTURE ANNUEL</div>
                      {qrCodeUrl && (
                        <img className="qr" src={qrCodeUrl} alt="QR Code" style={{ width: '150px', height: '150px', margin: '0 auto 10px', display: 'block' }} />
                      )}
                      <div style={{ textAlign: 'left', fontSize: '13px', margin: '0 auto', width: '220px' }}>
                        <div className="details"><strong>Titulaire :</strong> {createdPass.user?.firstName} {createdPass.user?.lastName}</div>
                        <div className="details"><strong>Type :</strong> {createdPass.passType}</div>
                        <div className="details"><strong>QR Code :</strong> {createdPass.qrCode}</div>
                        <div className="details"><strong>Valide du :</strong> {createdPass.startDate}</div>
                        <div className="details"><strong>Au :</strong> {createdPass.endDate}</div>
                      </div>
                      <div className="footer" style={{ fontSize: '9px', color: '#999', marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
                        Présentez ce PASS aux lecteurs d'accès à l'entrée des galeries.
                      </div>
                    </Box>
                    <Button variant="outlined" startIcon={<PrintIcon />} fullWidth onClick={handlePrint} sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}>
                      Imprimer le PASS
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Subscriptions List */}
            <Grid item xs={12} md={7}>
              <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: grey[100] }}>
                      <TableCell sx={{ fontWeight: 600 }}>Titulaire</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Valide jusqu'au</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>QR Code</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subscriptions.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.firstName} {row.lastName}</TableCell>
                        <TableCell>{row.passType}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '11px' }}>{row.qrCode}</TableCell>
                        <TableCell>
                          <span style={{ 
                            color: row.status === 'Actif' ? '#2e7d32' : '#d32f2f',
                            backgroundColor: row.status === 'Actif' ? '#edf7ed' : '#fde8e8',
                            padding: '3px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 600
                          }}>
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {subscriptions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                          Aucun abonnement PASS enregistré.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
