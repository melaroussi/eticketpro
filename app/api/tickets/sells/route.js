import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    if (id){
    /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.id AS id, sells.datetime AS datetime, sells.validityStartDatetime AS validityStartDatetime, sells.validityStopDatetime AS validityStopDatetime, sells.allowedScanNumber AS allowedScanNumber, positions.positionCode AS 'positionCode', positions.price AS 'positionPrice', sells.printed AS printed, sells.canceled AS canceled, sells.userId AS userId, sells.clientId AS clientId, tickets.id AS 'ticketId', tickets.category AS category, tickets.type AS type, tickets.price AS price, tickets.needReservation AS needReservation, tickets.forParking AS forParking, tickets.forGraphicalSell AS forGraphicalSell, tickets.NFCIdentifyer AS NFCIdentifyer, users.firstName AS firstName, users.lastName AS lastName, (SELECT COUNT(*) FROM scans WHERE scans.ticketSellId = sells.id) AS scanNumber FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId LEFT JOIN users ON users.id = sells.userId LEFT JOIN positions ON positions.id = sells.positionId  WHERE sells.id=?",
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.id AS id, sells.datetime AS datetime, sells.validityStartDatetime AS validityStartDatetime, sells.validityStopDatetime AS validityStopDatetime, sells.allowedScanNumber AS allowedScanNumber, sells.printed AS printed, sells.canceled AS canceled, sells.userId AS userId, sells.clientId AS clientId, tickets.id AS 'ticketId', tickets.category AS category, tickets.type AS type, tickets.price AS price, tickets.needReservation AS needReservation, tickets.forParking AS forParking, tickets.forGraphicalSell AS forGraphicalSell, tickets.NFCIdentifyer AS NFCIdentifyer, (SELECT COUNT(*) FROM scans WHERE scans.ticketSellId = sells.id) AS scanNumber FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId ORDER BY sells.datetime DESC",
        values: [],
      })
    }
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /**  Ticket Sell Operation */
    if (operation === "sell"){
      let data = await request.json();
      console.log(data)
      if (data){
        data.forEach(async function(item){
          for(let i=1; i<=item.quantity; i++){
            result = await excuteQuery({
              query: 'INSERT INTO ticket_sells(validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, paiementType, userId, clientId) VALUES(?, ?, ?, ?, ?, ?, ?)',
              values: [item.validityStartDatetime, item.validityStopDatetime, item.allowedScanNumber, item.ticketId, item.paiementType, item.userId, item.clientId],
            })
          }
        })
      }
    }
    /**  Ticket Sell Operation */
    if (operation === "graphical-sell"){
      let data = await request.json();
      if (data){
        /** Add Sell */
        result = await excuteQuery({
          query: 'INSERT INTO ticket_sells(validityStartDatetime, validityStopDatetime, allowedScanNumber, ticketId, positionId, paiementType, userId, clientId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
          values: [data.validityStartDatetime, data.validityStopDatetime, data.allowedScanNumber, data.ticketId, data.positionId, data.paiementType, data.userId, data.clientId],
        })
        /** Add Sell */
        result = await excuteQuery({
          query: 'UPDATE positions SET isSold = TRUE WHERE id=?',
          values: [data.positionId],
        })
      }
    }
    /**  Ticket Sell Operation */
    if (operation === "cancel"){
      let id = await request.nextUrl.searchParams.get("id");
      result = await excuteQuery({
        query: "UPDATE ticket_sells SET canceled = TRUE WHERE id = ?",
        values: [id],
      })
    }
    /**  Ticket Print Operation */
    if (operation === "print"){
      let id = await request.nextUrl.searchParams.get("id");
      result = await excuteQuery({
        query: "UPDATE ticket_sells SET printed = TRUE WHERE id = ?",
        values: [id],
      })
    }
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** DELETE Method */
export async function DELETE(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'DELETE FROM tickets WHERE id=?',
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}