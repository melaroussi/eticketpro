"use client"
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { AlertTitle, Grid, Paper, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Container  from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment"
import ButtonGroup from "@mui/material/ButtonGroup"
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';

/** Colors imports */
import { green, pink, blue, grey } from "@mui/material/colors";

// Icons Import
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StyleIcon from "@mui/icons-material/Style";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon  from "@mui/icons-material/Close";

/** Hooks */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Dashboard(props) {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  /** Validation message flag */
  let [validationAlert, setValidationAlert] = React.useState(false)
  let [authentificationAlert, setAuthentificationAlert] = React.useState(false)
  
  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  /** Form data */
  let [email, setEmail] = React.useState()
  let [password, setPassword] = React.useState()
  
  /** State handlers */
  const handleEmail = function(event){
    setEmail(event.target.value)
  }

  const handlePassword = function(event){
    setPassword(event.target.value)
  }

  const handleValidationAlert = function(event){
    setValidationAlert(false)
  }

  const handleAuthentificationAlert = function(event){
    setAuthentificationAlert(false)
  }
  
  /** Save button action */
  const login = async function(event){
    event.preventDefault()
    try{
      /** Save endpoint call */
      if ( !email || !password ){
        setValidationAlert(true)
      }
      else{
        const OPTIONS = {
          method: "GET", 
        }
        fetch(process.env.API_USER_ENDPOINT.concat("/users?operation=login&email=").concat(email).concat("&password=").concat(password), OPTIONS).then(function(response){
          response.json().then(function(data){
            let user = data.result[0]
            if (user){
              /** Stroe User Infos in Session */
              alert(JSON.stringify(user))
              sessionStorage.setItem("user", JSON.stringify(user))
              /** Redirections */
              if (user.profile === "admin") router.replace("/application/manager")
              if (user.profile === "cashier") router.replace("/application/cashier/tickets")
              if (user.profile === "chief-cashier") router.replace("/application/chief-cashier/tickets")
              if (user.profile === "shop-cashier") router.replace("/application/shop-cashier/tickets")
              if (user.profile === "parking-cashier") router.replace("/application/parking-cashier/tickets")
              if (user.profile === "visitor") router.replace("/application/visitor")
            }
            else setAuthentificationAlert(true)
          })
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      {/** */}
      <Grid container position={""} flexDirection="row" justifyContent="center" alignItems="center" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
        { /** Category Buttons */}
        <Grid item xs={12} sm={12}>
          <Container maxWidth="md">
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar sx={{ bgcolor: blue[600] }} variant="rounded"><AddCircleIcon /></Avatar>} title="Solution eTicket Pro v1.0" subheader="Authentification" />
              <CardContent spacing={2}>
                {/** Section InputTexts */}
                {
                  <Stack spacing={2}>
                    <Collapse in={validationAlert}>
                      <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleValidationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                        <AlertTitle>Validation</AlertTitle>
                        Merci de saisir les champs obligatoires marquées par (*) avant de valider le formulaire!
                      </Alert>
                    </Collapse>
                    <Collapse in={authentificationAlert}>
                      <Alert severity="error" action={<IconButton color="inherit"  size="small" onClick={handleAuthentificationAlert}> <CloseIcon fontSize="inherit" />  </IconButton>} sx={{ mb: 2 }} >
                        <AlertTitle>Authentification</AlertTitle>
                        Merci de vérifier votre email et mot de passe. Nous n'avons aucun enregistrement sur eTicket Pro avec les informations que vous avez saisi.  
                      </Alert>
                    </Collapse>
                    <Typography variant="body1" color="text.secondary">
                      Nous vous prions de saisir les champs obligatoires portants la mention (*). Les autres champs sont optionnels mais il est recommandé de saisir l'ensemble des données.
                    </Typography>
                    <Stack spacing={2}>
                      <TextField value={email} onChange={handleEmail} variant='outlined' size='small' label="Email" required fullWidth InputLabelProps={{ shrink: true }}/>
                      <TextField value={password} onChange={handlePassword} variant='outlined' type="password" size='small' label="Mot de Passe" required fullWidth InputLabelProps={{ shrink: true }}/>
                    </Stack>
                    <Stack spacing={1}>
                      <Button onClick={login} size="medium" variant='contained' fullWidth>Connexion</Button>
                    </Stack>
                  </Stack>
                }
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
