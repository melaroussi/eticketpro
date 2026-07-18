import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let query = await request.nextUrl.searchParams.get("query")
    
    /** Year Sells */
    if (query === "year-sells"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW())",
        values: [],
      })
    }

    /** Month Sells */
    if (query === "month-sells"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW())",
        values: [],
      })
    }

    /** Day Sells */
    if (query === "day-sells"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT COUNT(*) AS sellsNumber FROM ticket_sells WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM ticket_sells.datetime)=EXTRACT(DAY FROM NOW())",
        values: [],
      })
    }

      /** Year Turnover */
      if (query === "year-turnover"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW())",
          values: [],
        })
      }
  
      /** Month Turnover */
      if (query === "month-turnover"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW())",
          values: [],
        })
      }
  
      /** Day Turnover */
      if (query === "day-turnover"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM ticket_sells.datetime)=EXTRACT(MONTH FROM NOW()) AND EXTRACT(DAY FROM ticket_sells.datetime)=EXTRACT(DAY FROM NOW())",
          values: [],
        })
      }

      /** Sells by Type */
      if (query === "sells-by-type"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT tickets.type AS type, COUNT(*) AS sellsNumber FROM tickets INNER JOIN ticket_sells ON tickets.id = ticket_sells.ticketId GROUP BY tickets.type",
          values: [],
        })
      }

      /** Sells by Category */
      if (query === "sells-by-category"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT tickets.category AS category, COUNT(*) AS sellsNumber FROM tickets INNER JOIN ticket_sells ON tickets.id = ticket_sells.ticketId GROUP BY tickets.category",
          values: [],
        })
      }

      /** Turnover by Type */
      if (query === "turnover-by-type"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT tickets.type AS type, IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) GROUP BY tickets.type",
          values: [],
        })
      }

      /** Turnover by Category */
      if (query === "turnover-by-category"){
        /** Running SQL Query */
        result = await excuteQuery({
          query: "SELECT tickets.category AS category, IFNULL(SUM(tickets.price), 0) AS turnover FROM tickets INNER JOIN ticket_sells ON tickets.id=ticket_sells.ticketId WHERE EXTRACT(YEAR FROM ticket_sells.datetime)=EXTRACT(YEAR FROM NOW()) GROUP BY tickets.category",
          values: [],
        })
      }
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
