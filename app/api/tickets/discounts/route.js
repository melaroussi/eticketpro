import excuteQuery from '../../msdb-connexion';

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
        query: 'SELECT * FROM discounts WHERE id=?',
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT * FROM discounts',
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
        query: "INSERT INTO discounts(startDatetime, stopDatetime, rate, ticketId) VALUES (?, ?, ?, ?)",
        values: [data.startDatetime, data.stopDatetime, parseFloat(data.rate), parseInt(data.ticketId)],
      })
    }
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE discounts SET startDatetime=?, stopDatetime=?, rate=? WHERE id = ?',
        values: [data.startDatetime, data.stopDatetime, data.rate, id],
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
      query: 'DELETE FROM discounts WHERE id=?',
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}