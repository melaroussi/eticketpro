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
import NavigationSystem from '../../components/NavigationSystem';

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
  let [sellInfos, setSellInfos] = React.useState()

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

  /** Load and refresh hook */
  React.useEffect(function(){
    let id = searchParams.get('id')
    /** Load sell */
    const OPTIONS = {
      method: "GET", 
    }
    fetch(process.env.API_USER_ENDPOINT.concat("/tickets/sells?id=").concat(id), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setSellInfos(data.result[0])
        }
      })
    })
  }, [])

  return (
    <Grid container position={"fixed"}  flexDirection="row" justifyContent="flex-start" alignContent={"flex-start"}  alignItems="stretch" sx={{ width:"100%", height:"100vh", backgroundColor: grey[100]}}>
      { /** AppBar */}
      <Grid item xs={12} sm={12}>
        <NavigationSystem indicator={"visitor"} element={"Facturette"}/>
      </Grid>
      {/** Category Buttons */}
      <Grid item xs={12} sm={12} sx={{paddingTop: 10, height: "100%"}} >
      <Container maxWidth="xl" >
        {
          sellInfos && <PDFViewer showToolbar={true}  style={styles.viewer} >
            <Document title={"Facturette eTicket Pro"} pdfVersion="1.4"  >
              <Page size={"A5"} style={styles.page} >
                <View style={styles.section}>
                  <Image source={"/images/zoo-logo.png"} style={styles.logo}/>
                </View>
                <View style={styles.section}>
                  <Text style={styles.header}>eTicket Pro v1.0</Text>
                  <Text style={styles.subheader}>Facturette - Ticket</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.title}>Section 1</Text>
                  <Text style={styles.subtitle}>Identification du Ticket et Agent</Text>
                  <Text style={styles.label}>ID : <Text style={styles.paragraph}>{ sellInfos.id }</Text></Text>
                  <Text style={styles.label}>Date : <Text style={styles.paragraph}>{ moment(sellInfos.datetime).format("DD/MM/YYYY") }</Text></Text>
                  <Text style={styles.label}>Caissier : <Text style={styles.paragraph}>{ sellInfos.firstName.concat(" ").concat(sellInfos.lastName) }</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 2</Text>
                  <Text style={styles.subtitle}>Détails d'Opération d'Achat</Text>
                  
                  <Text style={styles.label}>Categorie : <Text style={styles.paragraph}>{ sellInfos.category }</Text></Text>
                  <Text style={styles.label}>Type : <Text style={styles.paragraph}>{ sellInfos.type }</Text></Text>
                  <Text style={styles.label}>Prix Unitaire (HT) : <Text style={styles.paragraph}>{ parseFloat(sellInfos.price).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>TVA (20 %) : <Text style={styles.paragraph}>{ parseFloat(sellInfos.price*0.2).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>Prix Unitaire (TTC) : <Text style={styles.paragraph}>{ parseFloat(sellInfos.price*1.2).toFixed(2) } DH</Text></Text>
                  <Text style={styles.label}>Quantité : <Text style={styles.paragraph}>{ sellInfos.quantity }</Text></Text>
                  <Text style={styles.label}>Prix Total (TTC) : <Text style={styles.paragraph}>{ parseFloat(sellInfos.price*1.2*sellInfos.quantity).toFixed(2) } DH</Text></Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Section 3</Text>
                  <Text style={styles.subtitle}>Validité du Ticket</Text>
                  
                  <Text style={styles.label}>Ticket valide du : { moment(sellInfos.validityStartDatetime).format("DD/MM/YYYY") } au : { moment(sellInfos.validityStopDatetime).format("DD/MM/YYYY") }.</Text>
                </View>
                <View style={styles.section}>

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