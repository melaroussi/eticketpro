"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container  from "@mui/material/Container";

/** Hooks Import */
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

/** PDF Generator Import */
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';


/** Colors imports */
import { green, grey } from "@mui/material/colors";

// Icons Import
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import NavigationSystem from '../../../components/NavigationSystem';

const moment = require("moment"); 
const MM_PIXELS_RATIO = 2.83 // 72DPI

export default function Dashboard(props) {
  const router = useRouter()
  const searchParams = useSearchParams()


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  // Dynamic Styles
  let [infos, setInfos] = React.useState()

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
      padding: 5,
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
      fontSize: 9,
      fontWeight: 'light',
    },
    title:{
      textDecoration:'underline',
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: 'extrabold',
    },
    subtitle:{
      fontSize: 11,
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

  /** Load and refresh hook */
  React.useEffect(function(){
    let id = onlineUser?.id
    /** Load sell */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=get-daily-chief-report&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setInfos(data.result[0])
        }
      })
    })
  }, [onlineUser])

  const handleLinks = function(e, target){
    e.preventDefault()
    router.replace("/application/".concat(target))
  }

  const logout = function(event){
    event.preventDefault()
    /** Erase the Session */
    router.push("/application/")
  }

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"tickets"} element={"Espace Billeterie"}/>
      </Grid>
      {/** Category Buttons */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10, height: "100%"}} >
      <Container maxWidth="xl" >
        {
          infos && <PDFViewer showToolbar={true}  style={styles.viewer} >
            <Document title={"Dacturette eTicket Pro"} pdfVersion="1.4"  >
              <Page size={"A5"} style={styles.page} >
                <View style={styles.section}>
                  <Image source={"/images/logo.jpeg"} style={styles.logo}/>
                </View>
                <View style={styles.section}>
                  <Text style={styles.header}>eTicket Pro v1.0</Text>
                  <Text style={styles.subheader}>PV de Clôture de la Recette Journalière</Text>
                  <Text style={styles.subtitle}>Chef de Caisse</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.title}>Section 1</Text>
                  <Text style={styles.subtitle}>Identification du Caissier et Journée</Text>
                  <Text style={styles.label}>Date : <Text style={styles.paragraph}>{ moment(infos.date).format("DD/MM/YYYY") }</Text></Text>
                  <Text style={styles.label}>Heure : <Text style={styles.paragraph}>{ moment(infos.date).format("hh:mm") }</Text></Text>
                  <Text style={styles.label}>Chef de Caisse : <Text style={styles.paragraph}>{ infos.firstName.concat(" ").concat(infos.lastName) }</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 3</Text>
                  <Text style={styles.subtitle}>Recette Journalière Par Canal de Paiement</Text>
                  <Text style={styles.label}>ESPECE : <Text style={styles.paragraph}>{ parseFloat(infos.cashTurnover).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>WEB : <Text style={styles.paragraph}>{ parseFloat(infos.webTurnover).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>CHEQUE : <Text style={styles.paragraph}>{ parseFloat(infos.checkTurnover).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>TPE : <Text style={styles.paragraph}>{ parseFloat(infos.TPETurnover).toFixed(2) } DH</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 3</Text>
                  <Text style={styles.subtitle}>Compte Espece</Text>
                  <Text style={styles.label}>200 DH : <Text style={styles.paragraph}>{ parseInt(infos.P200D) }</Text></Text>
                  <Text style={styles.label}>100 DH : <Text style={styles.paragraph}>{ parseInt(infos.P100D) }</Text></Text>
                  <Text style={styles.label}>50 DH : <Text style={styles.paragraph}>{ parseInt(infos.P50D) }</Text></Text>
                  <Text style={styles.label}>20 DH : <Text style={styles.paragraph}>{ parseInt(infos.P20D) }</Text></Text>
                  <Text style={styles.label}>10 DH : <Text style={styles.paragraph}>{ parseInt(infos.P10D) }</Text></Text>
                  <Text style={styles.label}>50 DH : <Text style={styles.paragraph}>{ parseInt(infos.P50D) }</Text></Text>
                  <Text style={styles.label}>2 DH : <Text style={styles.paragraph}>{ parseInt(infos.P2D) }</Text></Text>
                  <Text style={styles.label}>1 DH : <Text style={styles.paragraph}>{ parseInt(infos.P1D) }</Text></Text>
                  <Text style={styles.label}>50 Centimes : <Text style={styles.paragraph}>{ parseInt(infos.P50C) }</Text></Text>
                  <Text style={styles.label}>20 Centimes : <Text style={styles.paragraph}>{ parseInt(infos.P20C) }</Text></Text>
                  <Text style={styles.label}>10 Centimes : <Text style={styles.paragraph}>{ parseInt(infos.P10C) }</Text></Text>
                  <Text style={styles.label}>5 Centimes : <Text style={styles.paragraph}>{ parseInt(infos.P5C) }</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 3</Text>
                  <Text style={styles.subtitle}>Signatures</Text>
                  <Text style={styles.label}>Caissier(ère)</Text>
                  <Text style={styles.label}>Chef de Caisse ou Adjoint Chef de Caisse</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        }
        </Container>
      </Grid>
    </Grid>
  );
}