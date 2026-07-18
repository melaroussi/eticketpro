import excuteQuery from '../../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query:"SELECT s.id AS 'id', s.ticketId AS 'ticketId', s.zoneId AS 'zoneId', s.scanNumber AS 'scanNumber', z.label AS 'zoneLabel' FROM zone_scans s INNER JOIN zones z ON s.zoneId = z.id WHERE s.ticketId = ?",
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
