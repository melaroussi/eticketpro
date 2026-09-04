"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid, Stack, Paper, Alert, AlertTitle, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { blue, grey } from "@mui/material/colors";
import { useRouter } from 'next/navigation';

/** Icons import */
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";

import NavigationSystem from "../components/NavigationSystem";

const DRAWER_WIDTH = 250;

export default function HelpPage() {
  const router = useRouter();

  // Protection de route
  React.useEffect(() => {
    const loggedUser = sessionStorage.getItem("user");
    if (!loggedUser) {
      router.replace("/application");
    }
  }, [router]);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <CssBaseline />
      <NavigationSystem indicator={"help"} element={"Manuel d'utilisation"} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Header Card */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <Box 
                  sx={{ 
                    p: { xs: 3, md: 4 }, 
                    backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                    color: '#f8fafc',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                    <Avatar 
                      sx={{ 
                        bgcolor: '#0ea5e9', 
                        width: 70, 
                        height: 70,
                        boxShadow: '0 8px 30px rgba(14, 165, 233, 0.4)'
                      }}
                      variant="rounded"
                    >
                      <MenuBookIcon sx={{ fontSize: '2.5rem' }} />
                    </Avatar>
                    <Stack spacing={0.5} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.02em' }}>
                        Manuel d'Utilisation eTicket Pro
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                        Guide complet de la Solution de Gestion des Ventes et de Contrôle d'Accès du Musée National des Arts & Civilisations
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Alert severity="info" sx={{ borderRadius: 2, mb: 4 }}>
                    <AlertTitle sx={{ fontWeight: 700 }}>Note d'utilisation</AlertTitle>
                    Ce manuel décrit le fonctionnement de l'application <strong>eTicket Pro</strong>, développée pour la modernisation de la billetterie, des abonnements, et des accès du Musée National des Arts & Civilisations.
                  </Alert>

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>
                    📖 Sections du Manuel
                  </Typography>

                  {/* Section 1: Connection & Roles */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><LockIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>1. Connexion et Rôles Utilisateurs</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        L'accès au back-office de l'application s'effectue via l'interface de connexion centralisée. Après saisie des identifiants (Email et Mot de Passe), le système redirige automatiquement l'utilisateur vers son espace dédié selon son profil de poste.
                      </Typography>
                      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>Profil / Rôle</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Espace de Destination</TableCell>
                              <TableCell sx={{ fontWeight: 700 }}>Fonctions principales</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Guichetier (<code>cashier</code>)</TableCell>
                              <TableCell>Espace Caisse</TableCell>
                              <TableCell>Vente physique, création PASS, enregistrement Groupes</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Chef de Caisse (<code>chief-cashier</code>)</TableCell>
                              <TableCell>Supervision</TableCell>
                              <TableCell>Validation des annulations, clôtures de caisse, supervision comptable</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Caissier Boutique (<code>shop-cashier</code>)</TableCell>
                              <TableCell>Espace Boutique</TableCell>
                              <TableCell>Vente d'articles souvenirs, gestion des encaissements</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Caissier Parking (<code>parking-cashier</code>)</TableCell>
                              <TableCell>Espace Parking</TableCell>
                              <TableCell>Vente et contrôle de tickets de parking</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Administrateur / Manager (<code>admin</code>)</TableCell>
                              <TableCell>Espace Management</TableCell>
                              <TableCell>Rapports BI, configurations des tarifs, gestion des utilisateurs, SMTP, lecteurs</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Contrôleur (<code>visitor</code>)</TableCell>
                              <TableCell>Portail d'Accès</TableCell>
                              <TableCell>Contrôle visuel et statistiques en temps réel des flux d'entrées</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 2: Online Portal */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><PublicIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>2. Portail Web Public (Vente en Ligne)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Le portail web public permet aux visiteurs d'acheter des titres d'accès dématérialisés :
                      </Typography>
                      <Box sx={{ pl: 2, color: '#475569' }}>
                        <ul>
                          <li><strong>Choix du titre</strong> : Le visiteur choisit le type de ticket (Adulte, Enfant, Famille, Tarif réduit) ou formule d'abonnement (PASS Annuel).</li>
                          <li><strong>Calendrier</strong> : Sélection obligatoire de la date de visite.</li>
                          <li><strong>Paiement</strong> : Intégration CMI (sécurisé, cartes locales et internationales).</li>
                          <li><strong>Livraison</strong> : Génération automatique d'un e-ticket envoyé par e-mail avec un <strong>QR Code unique</strong>.</li>
                        </ul>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 3: Cashier */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><ConfirmationNumberIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>3. Billetterie Physique & Guichet (Cashier)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>A. Tickets Standards</Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        Le guichetier choisit la catégorie, sélectionne le mode de paiement (Espèces - avec calcul automatique du rendu de monnaie, CB, Chèque ou Wallet) puis valide. Le ticket s'imprime immédiatement avec le QR Code de contrôle.
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>B. Réservations de Groupes (Min. 20 personnes)</Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        Saisie des informations de la structure (ex: école, entreprise) et des accompagnateurs. L'option **Split de Groupe** permet de fractionner un grand groupe en plusieurs codes pour plus de flexibilité. L'édition d'une facture groupe est obligatoire.
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>C. Souscription de PASS Annuels</Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Création d'une fiche abonné avec nom, prénom, contacts et prise de photo en temps réel via la webcam ou import de fichier. Après validation et encaissement, impression de la carte physique d'abonnement JZN.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 4: Kiosk */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><SettingsIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>4. Bornes Interactives (Kiosk)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        Les bornes tactiles offrent un parcours en 3 à 5 étapes en libre-service multilingue (arabe, français, anglais).
                      </Typography>
                      <Alert severity="warning" sx={{ borderRadius: 2, mb: 2 }}>
                        <AlertTitle sx={{ fontWeight: 700 }}>Mode de paiement</AlertTitle>
                        Les bornes interactives n'acceptent <strong>uniquement les paiements par Carte Bancaire</strong>. Tout incident matériel (bourrage, fin de bobine de papier) envoie une alerte immédiate sur la console d'administration.
                      </Alert>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 5: Access Control */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><QrCodeIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>5. Contrôle d'Accès aux Tourniquets</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Vérification automatisée à la présentation du QR Code (sur papier ou smartphone) devant le lecteur optique du tourniquet :
                      </Typography>
                      <Box sx={{ pl: 2, color: '#475569', mb: 3 }}>
                        <ul>
                          <li><strong>Validation de date</strong> : Vérification que le ticket est valable pour le jour actuel.</li>
                          <li><strong>Statut</strong> : Vérification que le code n'a pas déjà été scanné (évite les fraudes par double scan).</li>
                          <li><strong>Indicateurs</strong> : Une icône verte et un bip confirment le déverrouillage physique. Une icône rouge indique un refus d'accès.</li>
                        </ul>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 6: Boutique and Parking */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><StorefrontIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>6. Services Annexes (Boutique & Parking)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Boutique de Souvenirs</Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        Module de caisse complet avec scan de codes-barres des articles, gestion des modes de paiement, impression du ticket de vente boutique et réduction automatique des stocks.
                      </Typography>

                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Parking du Musée</Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Distribution de tickets à l'entrée par barrière automatique. Encaissement du ticket à la sortie et déverrouillage de la barrière de sortie du parking.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 7: Chief Cashier */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><SupervisorAccountIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>7. Supervision & Annulations (Chef de Caisse)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Le Chef de Caisse dispose de privilèges exclusifs pour assurer la sécurité financière de la billetterie :
                      </Typography>
                      <Box sx={{ pl: 2, color: '#475569', mb: 3 }}>
                        <ul>
                          <li><strong>Annulations de transactions</strong> : Autorisation requise pour recréditer un visiteur ou annuler un ticket erroné.</li>
                          <li><strong>Clôture des caisses</strong> : Validation comptable journalière après comptage physique du coffre par rapport aux chiffres calculés par le système.</li>
                        </ul>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* Section 8: Manager */}
                  <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f5f9' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: blue[600], width: 32, height: 32 }}><SettingsIcon fontSize="small" /></Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>8. Pilotage & Business Intelligence (Manager)</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                        Le profil Manager a accès à l'ensemble de la console d'administration :
                      </Typography>
                      <Box sx={{ pl: 2, color: '#475569', mb: 3 }}>
                        <ul>
                          <li><strong>Dashboard en temps réel</strong> : Ventes (par canal), volume d'entrées de visiteurs, statistiques d'abonnements.</li>
                          <li><strong>Rapports analytiques</strong> : Suivi journalier, hebdomadaire et mensuel des recettes avec exports comptables.</li>
                          <li><strong>Paramétrages</strong> : Grilles de tarifs, configuration SMTP, ajout/suppression d'utilisateurs, gestion de l'état des lecteurs de tourniquets physiques.</li>
                        </ul>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
