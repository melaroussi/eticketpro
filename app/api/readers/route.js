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
        query: 'SELECT readers.id, readers.label, readers.ip, readers.zoneId, zones.label AS "zone" FROM readers INNER JOIN zones ON readers.zoneId = zones.id WHERE readers.id=?',
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT readers.id, readers.label, readers.ip, readers.zoneId, zones.label AS "zone" FROM readers INNER JOIN zones ON readers.zoneId = zones.id',
        values: [],
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
        query: "INSERT INTO readers(label, ip, zoneId) VALUES (?, ?, ?)",
        values: [data.label, data.ip, data.zoneId],
      })
    }
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      console.log(data, id)
      
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE readers SET label=?, ip=?, zoneId=? WHERE id=?',
        values: [data.label, data.ip, data.zoneId, id],
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

/** DELETE Method */
export async function DELETE(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'DELETE FROM readers WHERE id=?',
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