import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let operation = await request.nextUrl.searchParams.get("operation")
  
    /**  Getting Canevas by Ticket ID */
    if (operation === "get-canvas"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM canvas WHERE ticketId = ?",
        values: [id],
      })
    }

    /**  Getting Canevas Positions by Canvas ID */
    if (operation === "get-positions"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT * FROM positions WHERE canvasId = ?",
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
  
      /**  Update position status Canevas */
      if (operation === "update-position-status"){
      
        /** Getting Ticket and Canvas Ids */
        let id = await request.nextUrl.searchParams.get("id");
          
        /** Getting Canvas Infos */
        let data = await request.json();
          
          /** Deleting old canva */
        result = await excuteQuery({
          query:"UPDATE positions set isActive=? WHERE id=?",
          values: [data.isActive, id],
        })
      } 
  
      /**  Update position status Canevas */
      if (operation === "update-position-color"){
      
        /** Getting Ticket and Canvas Ids */
        let id = await request.nextUrl.searchParams.get("id");
          
        /** Getting Canvas Infos */
        let data = await request.json();
        console.log(data)  
        /** Deleting old canva */
        result = await excuteQuery({
          query:"UPDATE positions set color=?, price=? WHERE id=?",
          values: [data.color, data.price, id],
        })
      } 
        
    /**  Init Canevas */
    if (operation === "init-canvas"){
      
      /** Getting Ticket and Canvas Ids */
      let ticketId = await request.nextUrl.searchParams.get("ticketId");
      
      /** Getting Canvas Infos */
      let data = await request.json();
      
      /** Deleting old canva */
      result = await excuteQuery({
        query:"DELETE FROM canvas WHERE ticketId=?",
        values: [ticketId],
      })

      /** Creating the New Canvas */
      result = await excuteQuery({
        query:"INSERT INTO canvas(ticketId, xPositionsNumber, yPositionsNumber) VALUES(?, ?, ?)",
        values: [ticketId, data.xPositionsNumber, data.yPositionsNumber],
      })
      console.log(data)
      /** Getting Insert ID */
      let canvasId = result?.insertId
      /** Create Positions */
      let positions = data?.positions
      positions?.forEach(async function(item){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "INSERT INTO positions(canvasId, lineIndex, columnIndex, isActive, positionCode, color, price) VALUES (?, ?, ?, ?, ?, ?, ?)",          
          values: [canvasId, item.lineIndex, item.columnIndex, item.isActive, item.positionCode, item.color, item.price],
        })
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