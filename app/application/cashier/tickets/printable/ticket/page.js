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

  var QRCode = require('qrcode')

  var segs = [
    { data: 'ABCDEFG', mode: 'alphanumeric' },
    { data: '0123456', mode: 'numeric' }
  ]


  /** Online User */
  let [onlineUser, setOnlineUser] = React.useState()

  /** Getting Online User from Session */
  React.useEffect(function(){
    setOnlineUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  
  /** Loading flag */
  let [loading, setLoading] = React.useState(true)

  // Dynamic Styles
  let [styles, setStyles] = React.useState()

  // Dynamic Styles
  let [ticketInfos, setTicketInfos] = React.useState()

  // Printable Model
  let [printableModel, setPrintableModel] = React.useState()


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
          setTicketInfos(data.result[0])
        }
      })
    })

    fetch(process.env.API_USER_ENDPOINT.concat("/printables?operation=get-active"), OPTIONS).then(function(response){
      response.json().then(function(data){
        if (data.result){
          setPrintableModel(data.result[0])
        }
      })
    })
  }, [])

  let [QRCodeURL, setQRCodeURL] = React.useState()

  React.useEffect(function(){
    if (ticketInfos){
      let dataURL = "TK".concat(ticketInfos.ticketId).concat("V").concat(ticketInfos.id)

      QRCode.toDataURL(dataURL, function (err, url) {
        if (err) throw err
        setQRCodeURL(url)
      })
    }

  }, [ticketInfos])

  /** Load and refresh hook */
  React.useEffect(function(){
    // Create Dynamic Style
    if (printableModel){
      let tempo = StyleSheet.create({
        page: {
          maxHeight: printableModel.height*MM_PIXELS_RATIO,
          minHeight: printableModel.height*MM_PIXELS_RATIO,
          maxWidth: printableModel.width*MM_PIXELS_RATIO,
          minWidth: printableModel.width*MM_PIXELS_RATIO,
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginHorizontal: 0,
          marginVertical: 0,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignContent: "flex-start"
        },
        viewer:{
          height: 500,
          width: "100%",
        },
        elementAStyle:{
          position:'absolute' ,
          height: 80,
          width: 80,
          marginTop: printableModel.elementAY*MM_PIXELS_RATIO,
          marginLeft: printableModel.elementAX*MM_PIXELS_RATIO,
          fontSize: 10
        },
        elementBStyle:{
          position:'absolute' ,
          marginTop: printableModel.elementBY*MM_PIXELS_RATIO,
          marginLeft: printableModel.elementBX*MM_PIXELS_RATIO,
          fontSize: 10
        },
        elementCStyle:{
          position:'absolute' ,
          marginTop: printableModel.elementCY*MM_PIXELS_RATIO,
          marginLeft: printableModel.elementCX*MM_PIXELS_RATIO,
          fontSize: 10
        },
        elementDStyle:{
          position:'absolute' ,
          marginTop: printableModel.elementDY*MM_PIXELS_RATIO,
          marginLeft: printableModel.elementDX*MM_PIXELS_RATIO,
          fontSize: 10
        },
      })

      setStyles(tempo)
    }

  }, [printableModel])

  const onDocumentRenderCallback = function(blobDoc){

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
          ticketInfos && styles && printableModel && <PDFViewer showToolbar={true}  style={styles.viewer} >
            <Document author="eTicket Pro v1.0" creationDate={new Date()} onRender={onDocumentRenderCallback} >
              {
                [...new Array(ticketInfos.quantity || 1)].map(function(item, index){
                  let serial = "TK".concat(ticketInfos.ticketId).concat("V").concat(ticketInfos.id).concat("D").concat(moment(ticketInfos.datetime).format("MMYYYY"))
                  return (
                    <Page key={item} orientation={printableModel.orientation} style={styles.page}>
                      <View>
                        {
                          QRCodeURL && <Image id="QRCodeCanvas" source={QRCodeURL}  style={styles.elementAStyle}/>
                        }
                      </View>
                      <Text style={styles.elementBStyle}> Ticket : { serial } / { ticketInfos.category } / { ticketInfos.type }</Text>
                      <Text style={styles.elementCStyle}> Prix : { ticketInfos.price } DH / { ticketInfos.allowedScanNumber } Scan(s) </Text>
                      <Text style={styles.elementDStyle}> Ticket Valide du { moment(ticketInfos.validityStartDatetime).format("DD/MM/YYYY") } au { moment(ticketInfos.validityStopDatetime).format("DD/MM/YYYY") } </Text>
                    </Page>
                  )
                })
              }
            </Document>
          </PDFViewer>
        }
        </Container>
      </Grid>
    </Grid>
  );
}