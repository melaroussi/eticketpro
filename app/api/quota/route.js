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
        query: "SELECT a.ticketId, a.assigned, a.illimited, a.quota, COALESCE(sells.sellsNumber, 0) AS 'sellsNumber' FROM assignments a LEFT JOIN (SELECT ticketId, COUNT(id) AS sellsNumber FROM ticket_sells WHERE userId = ? GROUP BY ticketId) sells ON a.ticketId = sells.ticketId WHERE a.userId = ?",
        values: [data.userId, data.userId],
      })
    }
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
