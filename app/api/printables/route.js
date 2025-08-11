import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Get All operation */
    if (operation === "get-all"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM printables",
        values: [],
      })
    }
    /** Get by ID operation */
    if (operation === "get-one"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM printables WHERE id=?",
        values: [id],
      })
    }
    /** Get active one operation */
    if (operation === "get-active"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM printables WHERE status=TRUE",
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
        query: "INSERT INTO printables(size, width, height , orientation, elementAX, elementAY, elementBX, elementBY, elementCX, elementCY, elementDX, elementDY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.size, data.width, data.height , data.orientation, data.elementAX, data.elementAY, data.elementBX, data.elementBY, data.elementCX, data.elementCY, data.elementDX, data.elementDY],
      })
    }
    /** Update operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json()
      /** Disable all models */
      result = await excuteQuery({
        query: "UPDATE printables SET size = ?, width = ?, height = ?, orientation = ?, elementAX = ?, elementAY = ?, elementBX = ?, elementBY = ?, elementCX = ?, elementCY = ?, elementDX = ?, elementDY = ? WHERE id = ?",
        values: [data.size, data.width, data.height , data.orientation, data.elementAX, data.elementAY, data.elementBX, data.elementBY, data.elementCX, data.elementCY, data.elementDX, data.elementDY , id],
      })
    }
    /** Create operation */
    if (operation === "activate"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query - Disable all Models */
      result = await excuteQuery({
        query: "UPDATE printables SET status = FALSE",
        values: [id],
      })
      /** Running SQL Query - Enable a Model */
      result = await excuteQuery({
        query: "UPDATE printables SET status = TRUE WHERE id = ?",
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

/** DELETE Method */
export async function DELETE(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'DELETE FROM printables WHERE id=?',
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