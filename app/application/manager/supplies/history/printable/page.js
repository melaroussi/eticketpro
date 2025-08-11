"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Link, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Icons Import
import EditIcon from '@mui/icons-material/Edit';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import NavigationSystem from '../../../components/NavigationSystem';


import { useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'



const moment = require("moment"); 

const DRAWER_WIDTH = 250;

/** PDF Generator Import */
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { green } from '@mui/material/colors';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start"
  },
  section: {
    marginLeft: 20,
    padding: 20,
  },
  logo: {
    height: 50,
    width: 50
  },
  label:{
    fontSize: 10,
    fontWeight: 'demibold',
  },
  paragraph:{
    fontSize: 10,
    fontWeight: 'light',
  },
  title:{
    textDecoration:'underline',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'extrabold',
  },
  subtitle:{
    fontSize: 12,
    fontWeight: 'bold',
  },
  header:{
    fontSize: 14,
    fontWeight: 'thin',
  },
  subheader:{
    fontSize: 16,
    fontWeight: 'black',
  },
  viewer:{
    height: 500,
    width: "100%",
  },
});

export default function Dashboard(props) {
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  /** Data to fill lists */
  let [supply, setSupply] = React.useState()
  /** Doc Data */
  let [title, setTitle] = React.useState()
  let [subject, setSubject] = React.useState()
  let [producer, setProducer] = React.useState()
  let [author, setAuthor] = React.useState()
  let [modificationDate, setModificationDate] = React.useState()
  let [creationDate, setCreationDate] = React.useState()
  
  /** Loading flag */
  let [loading, setLoading] = React.useState(true)
  
  const MyDocument = function(){
    return(
      <Document title={title} subject={subject} producer={producer} author={author} modificationDate={modificationDate} creationDate={creationDate} pdfVersion="1.4"  >
        <Page size={"A5"} style={styles.page} >
          <View style={styles.section}>
            <Image source={"/images/zoo-logo.png"} style={styles.logo}/>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>eTicket Pro v1.0</Text>
            <Text style={styles.subheader}>Bon de Réception</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.title}>Section 1</Text>
            <Text style={styles.subtitle}>Déclaration de l'Agent</Text>
            {
              supply && <Text style={styles.paragraph}>
                Je soussignée, { supply.firstName } { supply.lastName } , déclare par la présente avoir bien reçu la quantité spécifiée du produit mentionné sur ce bon. Je confirme également que le produit est conforme et en bon état.
              </Text>
            }
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Section 2</Text>
            <Text style={styles.subtitle}>Détails d'Opération d'Approvisionnement</Text>
            {
            supply && <>
              <Text style={styles.label}>ID : <Text style={styles.paragraph}>{ supply.supplyId }</Text></Text>
              <Text style={styles.label}>Date : <Text style={styles.paragraph}>{ moment(supply.supplyDatetime).format("DD/MM/YYYY") }</Text></Text>
              <Text style={styles.label}>Heure : <Text style={styles.paragraph}>{ moment(supply.supplyDatetime).format("hh:mm") }</Text></Text>
              <Text style={styles.label}>Reference : <Text style={styles.paragraph}>{ supply.articleReference }</Text></Text>
              <Text style={styles.label}>Label : <Text style={styles.paragraph}>{ supply.label }</Text></Text>
              <Text style={styles.label}>Categorie : <Text style={styles.paragraph}>{ supply.category }</Text></Text>
              <Text style={styles.label}>Quantité en Stock : <Text style={styles.paragraph}>{ supply.availableQuantity }</Text></Text>
              <Text style={styles.label}>Quantité Approvisionnée : <Text style={styles.paragraph}>{ supply.supplyQuantity }</Text></Text>
            </>
          }
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Section 3</Text>
            <Text style={styles.subtitle}>Commentaire de l'Agent</Text>
            {
              supply && <Text style={styles.paragraph}>{ supply.comment === null ? "Rien à siglaner" : supply.comment }</Text>
            }
          </View>
          <View style={styles.section}>
            {
              supply &&  <Text style={styles.paragraph}>Signé : {supply.firstName.concat(" ").concat(supply.lastName.concat(", Le : ").concat(moment(Date()).format("DD/MM/YYYY")))}</Text>
            }
          </View>
      </Page>
    </Document>
  )
  
}


  /** Load and refresh hook */
  React.useEffect(function(){
    /** Get selected id */
    let id = searchParams.get('id')
    /** Load reader list */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/supplies?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setSupply(data.result[0])
          setLoading(false)
        }
      })
    })
  }, [loading])

  /** Load and refresh hook */
  React.useEffect(function(){
    if (supply){
      setTitle(moment(supply.supplyDatetime).format("YYYY.MM.DD").concat("-").concat(supply.articleReference))
      setSubject("Apprivisionnement : ".concat(moment(supply.supplyDatetime).format("YYYY.MM.DD")).concat("-").concat(supply.articleReference))
      setProducer("eTicket Pro v1.0")
      setAuthor(supply.firstName.concat(" ").concat(supply.lastName))
      setCreationDate(supply.supplyDatetime)
      setModificationDate(supply.supplyDatetime)
    }
  }, [supply])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationSystem indicator={"supplies"} element={"Gestion du Stock"}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs : '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)`} }}>
        <Toolbar />
        {/** Dashboard Main */}
        <Grid container  spacing={2}>
          {/** Data Table*/}
          <Grid item xs={12} sm={12}>
            <Container maxWidth="xl" > 
              <PDFViewer showToolbar={true} height={596} width={421}  style={styles.viewer}>
                <MyDocument />
              </PDFViewer>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}