import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: "SELECT a.id AS 'id', u.profile AS 'profile', u.firstName AS 'firstName', u.lastName AS 'lastName', a.illimited AS 'illimited', a.quota AS 'quota', a.assigned AS 'assigned' FROM assignments a INNER JOIN users u ON a.userId = u.id WHERE ticketId = ?",
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

/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Assigned */
    if (operation === "update-assigned"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();

      result = await excuteQuery({
        query:"UPDATE assignments SET assigned=? WHERE id=?",
        values: [data.assigned, id],
      })
    }
    /** Illimited quota */
    if (operation === "update-illimited"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
     
      result = await excuteQuery({
        query:"UPDATE assignments SET illimited=? WHERE id=?",
        values: [data.illimited, id],
      })
    }
    /** Quota */
    if (operation === "update-quota"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
   
      result = await excuteQuery({
        query:"UPDATE assignments SET quota=? WHERE id=?",
        values: [data.quota, id],
      })
    }
    
    /**  Init Mapping */
    if (operation === "init-assignments"){
      
      let id = await request.nextUrl.searchParams.get("id");

      /** Deleting old values */
      result = await excuteQuery({
        query:"DELETE FROM assignments WHERE ticketId=?",
        values: [id],
      })

      /** Getting profiles infos */
      result = await excuteQuery({
        query: "SELECT id AS 'userId', firstName AS 'firstName', lastName AS 'lastName' FROM users WHERE profile IN ('cashier', 'chief-cashier', 'parking-cashier', 'graphical-cahier')",
        values: [],
      })

      /** Create Ticket/Reader Matching */
      result.forEach(async function(item){
        /** Running SQL Query */
        result = await excuteQuery({
          query: 'INSERT INTO assignments(ticketId, userId) VALUES(?, ?)',
          values: [parseInt(id), item.userId],
        })
        console.log(result)
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