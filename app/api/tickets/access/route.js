import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'SELECT access.id as "id", readers.label as "reader", readers.ip as "ip", zones.label AS "zone", access.authorised FROM access INNER JOIN readers ON access.readerId=readers.id INNER JOIN zones ON readers.zoneId = zones.id WHERE ticketId=? ORDER BY zone',
      values: [id],
    })
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
    /**  Ticket/Reader Mapping */
    if (operation === "update-toggle"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Deleting Old Readers Matching */
      result = await excuteQuery({
        query:'UPDATE access SET authorised=? WHERE id=?',
        values: [data.authorised, id],
      })
    }
    /**  Ticket/Zone Scans Mapping */
    if (operation === "update-scan-number"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
 
      /** Deleting Old Readers Matching */
      result = await excuteQuery({
        query:'UPDATE zone_scans SET scanNumber=? WHERE id=?',
        values: [data.scanNumber, id],
      })
    }
    
    /**  Init Mapping */
    if (operation === "init-zones"){
      /** Getting Readers List */
      let id = await request.nextUrl.searchParams.get("id");
      /** Deleting Old Readers Matching */
      result = await excuteQuery({
        query:'DELETE FROM zone_scans WHERE ticketId=?',
        values: [id],
      })
      /** Getting Zones Infos */
      result = await excuteQuery({
        query: "SELECT zones.id AS 'zoneId', zones.label AS 'label' FROM zones",
        values: [],
      })
      /** Create Ticket/Reader Matching */
      result.forEach(async function(item){
        /** Running SQL Query */
        result = await excuteQuery({
          query: 'INSERT INTO zone_scans(ticketId, zoneId) VALUES(?, ?)',
          values: [parseInt(id), item.zoneId],
        })
      })
    }
    /**  Init Mapping */
    if (operation === "get-zone-scans"){
      /** Getting Readers List */
      let id = await request.nextUrl.searchParams.get("id");
      /** Deleting Old Readers Matching */
      result = await excuteQuery({
        query:"SELECT s.id AS 'Id', s.ticketId AS 'ticketId', s.zoneId AS 'zoneId', s.scanNumber AS 'scanNumber', z.label AS 'zoneLabel' FROM zone_scans s INNER JOIN zones z ON s.zoneId = z.id WHERE s.ticketId = ?",
        values: [id],
      })
    }
    /**  Init Mapping */
    if (operation === "init-readers"){
      /** Getting Readers List */
      let id = await request.nextUrl.searchParams.get("id");
      /** Deleting Old Readers Matching */
      result = await excuteQuery({
        query:'DELETE FROM access WHERE ticketId=?',
        values: [id],
      })
    }
    /**  Ticket/Reader Mapping */
    if (operation === "activate-zone-readers"){
      /** Getting Readers List */
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Getting Readers Infos */
      result = await excuteQuery({
        query: "SELECT readers.id AS 'readerId', readers.label AS 'label', readers.ip AS 'ip', zones.id AS 'zoneId', zones.label AS 'zone' FROM readers INNER JOIN zones ON zoneId = zones.id WHERE zoneId = ?",
        values: [data.zoneId],
      })
      /** Create Ticket/Reader Matching */
      result.forEach(async function(item){
        /** Running SQL Query */
        result = await excuteQuery({
          query: 'INSERT INTO access(ticketId, readerId, authorised) VALUES(?, ?, ?)',
          values: [parseInt(id), item.readerId, true],
        })
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