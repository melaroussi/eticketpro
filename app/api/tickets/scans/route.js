import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';


/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    /** Ticket Sell ID (to be added) */
    let ticketSellId = await request.nextUrl.searchParams.get("ticketSellId");
    /** Gettig Id Generated from QRC */
    let ticketId = await request.nextUrl.searchParams.get("ticketId");
    /** Getting Reader Id */
    let readerIP = await request.nextUrl.searchParams.get("readerIP");

    /** Getting zoneId by IP **/
    let zoneIdResults = await excuteQuery({
      query:"SELECT zoneId from readers WHERE ip=?",
      values: [readerIP],
    })

    if (zoneIdResults){
      /** Getting Zone Id */
      let zoneId = zoneIdResults[0].zoneId

      /** Getting id a reader is authorized for a ticket by IP **/
      let readerAutorizationResults = await excuteQuery({
        query:"SELECT a.authorised AS 'authorised' FROM access a INNER JOIN readers r ON a.readerId = r.id WHERE a.ticketId = ? AND r.ip=?",
        values: [ticketId, readerIP],
      })

      if (readerAutorizationResults && readerAutorizationResults[0].authorised){
        console.log("reader ok")
        
        /** Getting Available Scans*/
        let scansNumberResult = await excuteQuery({
          query:"SELECT COUNT(*) AS 'scanNumber' FROM scans WHERE ticketSellId= ? AND zoneId= ?",
          values: [ticketSellId, zoneId],
        })

        /** Getting authorizedScansResult by Zone/reader Scans*/
        let authorizedScansResult = await excuteQuery({
          query:"SELECT scanNumber AS 'authorizedScans' FROM zone_scans WHERE ticketId = ? AND zoneId= ?",
          values: [ticketId, zoneId],
        })

        if (scansNumberResult && authorizedScansResult){
          /** Check If there are available scans */
          if (authorizedScansResult[0].authorizedScans > scansNumberResult[0].scanNumber){
            /** Add new Scan */
            let updateScansResult = await excuteQuery({
              query:"INSERT INTO scans(zoneId, ticketSellId) VALUES (?, ?)",
              values: [zoneId, ticketSellId],
            })

            /** Available Scans Infos */
            let availableScansInfos = await excuteQuery({
              query:"SELECT z.label AS 'zone', zs.scanNumber AS 'scanNumber', (SELECT COUNT(*) FROM scans s INNER JOIN ticket_sells ts ON ts.id = s.ticketSellId AND s.ticketSellId = ? AND zoneId = z.id) AS 'scanned'  FROM zones z INNER JOIN zone_scans zs ON zs.zoneId = z.id GROUP BY z.id",
              values: [ticketSellId],
            })

            result = {
              status: "SUCCESS",
              availableScansInfos: availableScansInfos
            }
          }
          else{
            /** Available Scans Infos */
            let availableScansInfos = await excuteQuery({
              query:"SELECT z.label AS 'zone', COUNT(*) AS 'scaned', zs.scanNumber FROM scans s INNER JOIN zones z ON s.zoneId = z.id  INNER JOIN zone_scans zs ON zs.zoneId = s.zoneId AND zs.ticketId = s.ticketSellId WHERE ticketSellId = ?",
              values: [ticketSellId], // Replace tict ID by Ticket Sell ID -- Done
            })

            result = {
              status: "FAILURE",
              reason: "No available scans on this zone",
              availableScansInfos: availableScansInfos
            }
          }
        }
      }
      else{
        result = {
          status: "FAILURE",
          reason: "Reader is not allowed",
        }
      }
    }
    else{
      result = {
        status: "FAILURE",
        reason: "Non identified zone with given reader IP",
        availableScansInfos: availableScansInfos
      }
    }

  }    
  catch(error) {
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}