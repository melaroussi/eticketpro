import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

var xml2js = require('xml2js');

  /** CMI API Calls */
  const generatePreAuthentificationXMLRequestBody = function(cardNumber, expirationMonth, expirationYear, CVV, totalTTC){
    let XMLQuery = `<CC5Request>
        <Name>${process.env.CMI_CC5REQUEST_NAME}</Name>
        <Password>${process.env.CMI_CC5REQUEST_PASSWORD}</Password>
        <ClientId>${process.env.CMI_CC5REQUEST_CLIENT_ID}</ClientId>
        <Type>PreAuth</Type>
        <Number>${cardNumber}</Number>
        <Expires>${String(expirationMonth).concat(String(".")).concat(String(expirationYear))}</Expires>
        <Cvv2Val>${CVV}</Cvv2Val>
        <Total>${totalTTC}</Total>
        <Currency>${process.env.CMI_CC5REQUEST_CURRENCY}</Currency>
    </CC5Request>`
    return XMLQuery
  }

  const generatePostAuthentificationXMLRequestBody = function(orderId){
    let XMLQuery = `<CC5Request>
      <Name>${process.env.CMI_CC5REQUEST_NAME}</Name>
      <Password>${process.env.CMI_CC5REQUEST_PASSWORD}</Password>
      <ClientId>${process.env.CMI_CC5REQUEST_CLIENT_ID}</ClientId>
      <Type>PostAuth</Type>
      <OrderId>${orderId}</OrderId>
    </CC5Request>`

    console.log(XMLQuery)
    return XMLQuery
  }

/** POST Method */
export async function POST(request) {
  let result = {}
 
  try{
    let body = await request.json();
    console.log(body)
    const OPTIONS = {
      method: "POST", 
      mode: "no-cors", 
      headers: {
        "Content-Type": "text/xml",
      },
      body: generatePreAuthentificationXMLRequestBody(body.cardNumber, body.expirationMonth, body.expirationYear, body.CVV, body.totalTTC)
    }
    fetch(process.env.CMI_CC5REQUEST_ENDPOINT, OPTIONS).then(function(response){
      response.text().then(function(data){
        xml2js.parseStringPromise(data).then(function (result) {
          if (result.CC5Response && result.CC5Response.Response){
            let status = result.CC5Response.Response[0]
                   
            /** Transaction Approuved - Start Post Authorization */
            if (status === "Approved"){
              let orderId = result.CC5Response.OrderId[0]
              let transactionId = result.CC5Response.TransId[0]
                
              /** Post Authorization Call */
              const OPTIONS = {
                method: "POST", 
                mode: "no-cors", 
                headers: {
                  "Content-Type": "text/xml",
                },
                body: generatePostAuthentificationXMLRequestBody(orderId)
              }
              fetch(process.env.CMI_CC5REQUEST_ENDPOINT, OPTIONS).then(function(response){
                response.text().then(function(data){
                  xml2js.parseStringPromise(data).then(function (result) {
                    console.log(result)
                    if (result.CC5Response && result.CC5Response.Response){
                      let status = result.CC5Response.Response[0]
                      if (status === "Approved"){
                        let orderId = result.CC5Response.OrderId[0]
                        let transactionId = result.CC5Response.TransId[0]

                        /** Save Tickets to DB */
                        body.cart.forEach(async function(item){
                          await excuteQuery({
                            query: 'INSERT INTO ticket_sells(quantity, validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, paiementType, userId) VALUES(?, ?, ?, ?, ?, ?, ?)',
                            values: [item.quantity, item.validityStartDatetime, item.validityStopDatetime, item.allowedScanNumber, item.ticketId, item.paiementType, item.userId],
                          })
                        })
                        result = {
                          done: true,
                          orderId: orderId,
                          transactionId: transactionId
                        }
                        console.log(result)
                      }
                      else{
                        let errorMessage = result.CC5Response.ErrMsg[0]
                        /** Sending Back the Status */
                        result = {
                          done: false,
                          reason: "POST_AUTHORIZATION_NOT_APPROVED",
                          errorMessage: errorMessage
                        }
                        console.log(result)
                      }
                    }
                  })
                })
              })
            }
            else{
              /** Sending Back the Status */
              result = {
                done: false,
                reason: "NOT_APPROVED"
              }
              console.log(result)
            }
          }
        })
      })
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}