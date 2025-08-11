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
  let [infosByPaiementType, setInfosByPaiementType] = React.useState()

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
    /** Get Infos */
    fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=get-daily-cashier-turnover&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setInfos(data.result[0])
        }
      })
    })
    /** Get Infos by Group */
    fetch(process.env.API_USER_ENDPOINT.concat("/reports?operation=get-daily-cashier-turnover-by-group&id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setInfosByPaiementType(data.result)
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
          infos && infosByPaiementType && <PDFViewer showToolbar={true}  style={styles.viewer} >
            <Document title={"PV de Clôture Journalier"} pdfVersion="1.4"  >
              <Page size={"A5"} style={styles.page} >
                <View style={styles.section}>
                  <Image source={"/images/logo.jpeg"} style={styles.logo}/>
                </View>
                <View style={styles.section}>
                  <Text style={styles.header}>eTicket Pro v1.0</Text>
                  <Text style={styles.subheader}>PV de Clôture de la Recette Journalière</Text>
                  <Text style={styles.subtitle}>Caissier(ère)</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.title}>Section 1</Text>
                  <Text style={styles.subtitle}>Identification du Caissier et Journée - Caissier</Text>
                  <Text style={styles.label}>Date : <Text style={styles.paragraph}>{ moment(infos.date).format("DD/MM/YYYY") }</Text></Text>
                  <Text style={styles.label}>Heure : <Text style={styles.paragraph}>{ moment(infos.date).format("hh:mm") }</Text></Text>
                  <Text style={styles.label}>Caissier(ère) : <Text style={styles.paragraph}>{infos.firstName} {infos.lastName}</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 2</Text>
                  <Text style={styles.subtitle}>Recette Journalière Totale</Text>
                  <Text style={styles.label}>Montant (HT) : <Text style={styles.paragraph}>{ parseFloat(infos.turnover).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>TVA (20%) : <Text style={styles.paragraph}>{ parseFloat(infos.VAT).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>Montant (TTC) : <Text style={styles.paragraph}>{ parseFloat(infos.turnover+infos.VAT).toFixed(2) } DH</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 3</Text>
                  <Text style={styles.subtitle}>Recette Journalière Par Canal de Paiement</Text>
                  {
                    infosByPaiementType.map(function(item){
                      return(
                        <>
                          <Text style={styles.label}>Canal de Paiement : <Text style={styles.paragraph}>{ item.paiementType } </Text></Text>
                          <Text style={styles.label}>Montant (HT) : <Text style={styles.paragraph}>{ parseFloat(item.turnover).toFixed(2) } DH</Text></Text>
                          <Text style={styles.label}>TVA (20%) : <Text style={styles.paragraph}>{ parseFloat(item.VAT).toFixed(2) } DH</Text></Text>
                          <Text style={styles.label}>Montant (TTC) : <Text style={styles.paragraph}>{ parseFloat(item.turnover+item.VAT).toFixed(2) } DH</Text></Text>
                          <Text style={styles.label}>--------------------------------------</Text>
                        </>
                      )
                    })
                  }
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