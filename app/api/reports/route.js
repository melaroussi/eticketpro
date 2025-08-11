import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Get All operation */
    if (operation === "get-all"){
      let userId = await request.nextUrl.searchParams.get("userId");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM daily_reports WHERE userId=?",
        values: [userId],
      })
    }

    /** Get All operation */
    if (operation === "get-one"){
      let id = await request.nextUrl.searchParams.get("id");
      
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM daily_reports INNER JOIN users ON daily_reports.userId=users.id WHERE daily_reports.id=?",
        values: [id],
      })
    }

    /** Get ATurnover */
    if (operation === "get-daily-cashier-turnover"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.datetime AS 'date', SUM(sells.quantity*tickets.price) AS 'turnover', SUM(sells.quantity*tickets.price)*0.2 AS 'VAT',  users.firstName, users.lastName FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId INNER JOIN users ON users.id=sells.userId WHERE sells.userId = ? AND EXTRACT(YEAR FROM sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM sells.datetime)=EXTRACT(DAY FROM NOW())",
        values: [id],
      })
    }

    /** Get Turnover By Paiement Type */
    if (operation === "get-daily-cashier-turnover-by-group"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.datetime AS 'date', SUM(sells.quantity*tickets.price) AS 'turnover', SUM(sells.quantity*tickets.price)*0.2 AS 'VAT', sells.paiementType AS 'paiementType',  users.firstName, users.lastName FROM ticket_sells AS sells INNER JOIN tickets as tickets ON tickets.id = sells.ticketId INNER JOIN users ON users.id=sells.userId WHERE sells.userId = ? AND EXTRACT(YEAR FROM sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM sells.datetime)=EXTRACT(DAY FROM NOW()) GROUP BY sells.paiementType",
        values: [id],
      })
    }

    /** Get Global Turnover By Paiement Type and Money Pieces */
    if (operation === "get-daily-chief-report"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM daily_reports INNER JOIN users ON users.id=daily_reports.userId WHERE daily_reports.userId=?",
        values: [id],
      })
    }
  } 
  catch(error) {
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}

/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Create operation */
    if (operation === "create"){
      let data = await request.json()
      /** Running SQL Query */
      result = await excuteQuery({
        query: "INSERT INTO daily_reports(cashTurnover, TPETurnover, webTurnover, checkTurnover, turnover, P200D, P100D, P50D, P20D, P10D, P5D, P2D, P1D, P50C, P20C, P10C, P5C, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.cashTurnover,  data.TPETurnover,  data.webTurnover, data.checkTurnover, data.turnover, data.P200D, data.P100D, data.P50D, data.P20D, data.P10D, data.P5D, data.P2D, data.P1D, data.P50C, data.P20C, data.P10C, data.P5C, data.userId],
      })
    }
  }
  catch(error){
    console.log(error)
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}

/** DELETE Method */
export async function DELETE(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'DELETE FROM daily_reports WHERE id=?',
      values: [id],
    })
  } 
  catch(error) {
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}