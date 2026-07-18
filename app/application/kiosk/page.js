"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, Stack, IconButton, Card, CardContent, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PrintIcon from "@mui/icons-material/Print";
import { blue, green, grey, orange } from "@mui/material/colors";
import { useRouter } from 'next/navigation';

// Multilingual translations
const TRANSLATIONS = {
  fr: {
    welcome: "Bienvenue au Jardin Zoologique de Rabat",
    selectLang: "Veuillez choisir votre langue",
    chooseTickets: "Sélectionnez vos Billets",
    back: "Retour",
    next: "Continuer",
    pay: "Procéder au Paiement",
    price: "Prix",
    qty: "Quantité",
    total: "Total à payer",
    insertCard: "Veuillez insérer ou approcher votre carte bancaire",
    processing: "Traitement du paiement en cours...",
    paySuccess: "Paiement Réussi !",
    printing: "Impression de vos billets...",
    thankYou: "Merci de votre visite et bonne journée !",
    kioskTitle: "Borne Interactive de Billetterie",
    emptyCart: "Votre panier est vide.",
    home: "Accueil"
  },
  en: {
    welcome: "Welcome to Rabat National Zoo",
    selectLang: "Please select your language",
    chooseTickets: "Select Your Tickets",
    back: "Back",
    next: "Continue",
    pay: "Proceed to Payment",
    price: "Price",
    qty: "Quantity",
    total: "Total to pay",
    insertCard: "Please insert or tap your credit card",
    processing: "Processing payment...",
    paySuccess: "Payment Successful!",
    printing: "Printing your tickets...",
    thankYou: "Thank you for your visit, have a great day!",
    kioskTitle: "Self-Service Ticket Kiosk",
    emptyCart: "Your cart is empty.",
    home: "Welcome Screen"
  },
  ar: {
    welcome: "مرحباً بكم في الحديقة الوطنية للحيوانات بالرباط",
    selectLang: "الرجاء اختيار لغتكم",
    chooseTickets: "اختر تذاكرك",
    back: "رجوع",
    next: "استمرار",
    pay: "الدفع",
    price: "السعر",
    qty: "الكمية",
    total: "المجموع المطلوب دفعه",
    insertCard: "يرجى إدخال أو تقريب بطاقتكم البنكية",
    processing: "جاري معالجة عملية الدفع...",
    paySuccess: "تم الدفع بنجاح!",
    printing: "جاري طباعة التذاكر الخاصة بك...",
    thankYou: "شكراً لزيارتكم ويوماً سعيداً!",
    kioskTitle: "شباك التذاكر التفاعلي والذاتي",
    emptyCart: "سلة التسوق فارغة.",
    home: "الشاشة الرئيسية"
  }
};

export default function KioskPage() {
  const router = useRouter();

  const [step, setStep] = React.useState(1); // 1: Language selection, 2: Ticket Selection, 3: Payment simulation, 4: Printing & Success
  const [lang, setLang] = React.useState("fr");
  const [tickets, setTickets] = React.useState([]);
  const [cart, setCart] = React.useState({}); // format: { ticketId: quantity }
  const [loadingPayment, setLoadingPayment] = React.useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  // Load tickets list on mount
  React.useEffect(() => {
    fetch("/api/tickets")
      .then(res => res.json())
      .then(data => {
        if (data.result) setTickets(data.result);
      })
      .catch(err => console.error("Error loading tickets:", err));
  }, []);

  const selectLanguage = (selectedLang) => {
    setLang(selectedLang);
    setStep(2);
  };

  const handleQtyChange = (ticketId, delta) => {
    const currentQty = cart[ticketId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    setCart({
      ...cart,
      [ticketId]: newQty
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const ticket = tickets.find(t => t.id === parseInt(id));
      return sum + (ticket ? ticket.price * qty : 0);
    }, 0);
  };

  const isCartEmpty = () => {
    return Object.values(cart).every(qty => qty === 0);
  };

  const handleProceedToPayment = () => {
    if (isCartEmpty()) return;
    setStep(3);
    setLoadingPayment(true);

    // Simulate 3 seconds credit card verification
    setTimeout(async () => {
      setLoadingPayment(false);
      setStep(4);

      // Call API to record sale
      try {
        const payload = Object.entries(cart)
          .filter(([_, qty]) => qty > 0)
          .map(([id, qty]) => {
            const ticket = tickets.find(t => t.id === parseInt(id));
            const today = new Date().toISOString().split('T')[0];
            return {
              ticketId: parseInt(id),
              quantity: qty,
              validityStartDatetime: `${today} 00:00:00`,
              validityStopDatetime: `${today} 23:59:59`,
              allowedScanNumber: 1, // default scan allowed
              paiementType: "Carte Bancaire",
              userId: 1, // Kiosk / Admin Default ID
              clientId: null
            };
          });

        await fetch("/api/tickets/sells?operation=sell", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error("Failed to register kiosk ticket sale:", err);
      }

      // Reset cart and return to language selection after 6 seconds
      setTimeout(() => {
        setCart({});
        setStep(1);
      }, 6000);
    }, 3000);
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", 
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        direction: lang === "ar" ? "rtl" : "ltr"
      }}
    >
      <CssBaseline />

      {/* Header bar */}
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <LocalActivityIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1 }}>
            eTicket Pro
          </Typography>
        </Stack>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
          {t.kioskTitle}
        </Typography>
      </Box>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Step 1: Language selection */}
        {step === 1 && (
          <Stack spacing={4} sx={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Welcome / Bienvenue / مرحباً
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 4 }}>
              Please select your language / Veuillez choisir votre langue / الرجاء اختيار اللغة
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Button 
                  onClick={() => selectLanguage("fr")}
                  fullWidth 
                  variant="contained"
                  sx={{ py: 3, fontSize: '1.5rem', borderRadius: 4, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}
                >
                  Français
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  onClick={() => selectLanguage("en")}
                  fullWidth 
                  variant="contained"
                  sx={{ py: 3, fontSize: '1.5rem', borderRadius: 4, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
                >
                  English
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  onClick={() => selectLanguage("ar")}
                  fullWidth 
                  variant="contained"
                  sx={{ py: 3, fontSize: '1.5rem', borderRadius: 4, bgcolor: '#d97706', '&:hover': { bgcolor: '#b45309' } }}
                >
                  العربية
                </Button>
              </Grid>
            </Grid>
          </Stack>
        )}

        {/* Step 2: Tickets Selection */}
        {step === 2 && (
          <Grid container spacing={4} sx={{ width: '100%' }}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                {t.chooseTickets}
              </Typography>
              <Stack spacing={2}>
                {tickets.map(ticket => {
                  const qty = cart[ticket.id] || 0;
                  return (
                    <Card key={ticket.id} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '20px !important' }}>
                        <Stack spacing={0.5}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {ticket.category} ({ticket.type})
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            {ticket.description || "Entrée standard au Jardin Zoologique"}
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#3b82f6' }}>
                            {ticket.price} DH
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 3, p: 0.5 }}>
                            <IconButton onClick={() => handleQtyChange(ticket.id, -1)} sx={{ color: '#fff' }} disabled={qty === 0}>
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ px: 2, fontWeight: 700 }}>
                              {qty}
                            </Typography>
                            <IconButton onClick={() => handleQtyChange(ticket.id, 1)} sx={{ color: '#fff' }}>
                              <AddIcon />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </Grid>

            {/* Shopping Cart Summary panel */}
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 4, p: 2, border: '1px solid rgba(255,255,255,0.15)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 2, mb: 3 }}>
                    Récapitulatif
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {Object.entries(cart).map(([id, qty]) => {
                      if (qty === 0) return null;
                      const ticket = tickets.find(t => t.id === parseInt(id));
                      if (!ticket) return null;
                      return (
                        <Box key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1">{qty}x {ticket.category}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>{ticket.price * qty} DH</Typography>
                        </Box>
                      );
                    })}
                    {isCartEmpty() && (
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', py: 4 }}>
                        {t.emptyCart}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', pt: 3, mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{t.total}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981' }}>{getTotalPrice()} DH</Typography>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    onClick={handleProceedToPayment}
                    disabled={isCartEmpty()}
                    sx={{ 
                      py: 2, 
                      fontSize: '1.2rem', 
                      borderRadius: 3,
                      bgcolor: '#10b981', 
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                      '&:hover': { bgcolor: '#059669' } 
                    }}
                  >
                    {t.pay}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Step 3: Payment Simulation */}
        {step === 3 && (
          <Stack spacing={4} sx={{ textAlign: 'center', width: '100%', maxWidth: 600 }}>
            <PaymentIcon sx={{ fontSize: 100, color: '#3b82f6', margin: '0 auto' }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {t.insertCard}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              {t.total} : <strong style={{ color: '#10b981', fontSize: '1.5rem' }}>{getTotalPrice()} DH</strong>
            </Typography>
            
            {loadingPayment && (
              <Stack alignItems="center" spacing={2} sx={{ mt: 4 }}>
                <CircularProgress color="primary" size={50} />
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                  {t.processing}
                </Typography>
              </Stack>
            )}
          </Stack>
        )}

        {/* Step 4: Printing & Success */}
        {step === 4 && (
          <Stack spacing={4} sx={{ textAlign: 'center', width: '100%', maxWidth: 600 }}>
            <CheckCircleIcon sx={{ fontSize: 100, color: '#10b981', margin: '0 auto' }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#10b981' }}>
              {t.paySuccess}
            </Typography>
            
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 4, bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
              <PrintIcon sx={{ fontSize: 50, color: '#ff9800' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff9800' }}>
                {t.printing}
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mt: 4 }}>
              {t.thankYou}
            </Typography>
          </Stack>
        )}

      </Container>

      {/* Footer bar */}
      <Box sx={{ p: 4, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {step > 1 && step < 3 ? (
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={() => setStep(step - 1)}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 2, textTransform: 'none' }}
          >
            {t.back}
          </Button>
        ) : (
          <Box />
        )}
        {step === 2 && (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            ZJN Rabat Terminal #01
          </Typography>
        )}
      </Box>
    </Box>
  );
}
