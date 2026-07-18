import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Read operation */
    if (id){
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT * FROM tickets WHERE id=?',
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT * FROM tickets',
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
    /** Create operation */
    if (operation === "create"){
     
      let data = await request.json()
      console.log(data)
      /** Running SQL Query */
      result = await excuteQuery({
        query: "INSERT INTO tickets(category, type, price, needReservation, minimumOrders, forParking, forGraphicalSell, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.category, data.type, data.price, data.needReservation, data.minimumOrders, data.forParking, data.forGraphicalSell, data.description],
      })
      console.log(result)
    }
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();

      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE tickets SET category=?, type=?, price=?, needReservation=?, minimumOrders=?, onTimeDefinitionAllowedScanNumber=?, forParking=?, forGraphicalSell = ?, NFCIdentifyer=?, description=? WHERE id = ?',
        values: [data.category, data.type, data.price, data.needReservation, data.minimumOrders, data.onTimeDefinitionAllowedScanNumber, data.forParking, data.forGraphicalSell, data.NFCIdentifyer, data.description, id],
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