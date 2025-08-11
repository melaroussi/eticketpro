import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Create operation */
    if (operation === "get-quota-infos"){
      let data = await request.json()
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT a.assigned, a.illimited, a.quota, a.ticketId, COUNT(ts.id) AS 'sellsNumber' FROM assignments a INNER JOIN ticket_sells ts WHERE ts.userId = ? GROUP BY a.ticketId",
        values: [data.userId],
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
