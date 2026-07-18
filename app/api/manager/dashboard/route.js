import excuteQuery from '../../msdb-connexion';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Total Tickets Sales
    const ticketSalesResult = await excuteQuery({
      query: "SELECT SUM(t.price) AS total FROM ticket_sells ts JOIN tickets t ON ts.ticketId = t.id WHERE ts.canceled = 0",
      values: []
    });
    const ticketSales = (ticketSalesResult && ticketSalesResult[0] && ticketSalesResult[0].total) || 0;

    // 2. Total Article Sales
    const articleSalesResult = await excuteQuery({
      query: "SELECT SUM(s.quantity * a.price) AS total FROM article_sells s JOIN articles a ON s.articleId = a.id",
      values: []
    });
    const articleSales = (articleSalesResult && articleSalesResult[0] && articleSalesResult[0].total) || 0;

    const totalSales = parseFloat(ticketSales) + parseFloat(articleSales);

    // 3. Total Scanned / Entries
    const scansResult = await excuteQuery({
      query: "SELECT COUNT(*) AS total FROM scans",
      values: []
    });
    const totalScans = (scansResult && scansResult[0] && scansResult[0].total) || 0;

    // 4. Active PASS Subscriptions
    const passResult = await excuteQuery({
      query: "SELECT COUNT(*) AS total FROM pass_subscriptions WHERE status = 'Actif'",
      values: []
    });
    const activePass = (passResult && passResult[0] && passResult[0].total) || 0;

    // 5. Low Stock Articles (quantity < 10)
    const lowStockResult = await excuteQuery({
      query: "SELECT COUNT(*) AS total FROM articles WHERE availableQuantity < 10",
      values: []
    });
    const lowStockCount = (lowStockResult && lowStockResult[0] && lowStockResult[0].total) || 0;

    // 6. Recent Ticket Sales (last 5)
    const recentSales = await excuteQuery({
      query: "SELECT ts.id, ts.datetime, t.category, t.type, t.price, u.firstName, u.lastName FROM ticket_sells ts JOIN tickets t ON ts.ticketId = t.id LEFT JOIN users u ON ts.userId = u.id ORDER BY ts.datetime DESC LIMIT 5",
      values: []
    });

    // 7. Recent Scans (last 5)
    const recentScans = await excuteQuery({
      query: "SELECT s.id, s.datetime, s.status, z.label AS zoneLabel FROM scans s LEFT JOIN zones z ON s.zoneId = z.id ORDER BY s.datetime DESC LIMIT 5",
      values: []
    });

    return NextResponse.json({
      success: true,
      data: {
        totalSales: totalSales.toFixed(2),
        totalScans,
        activePass,
        lowStockCount,
        recentSales,
        recentScans
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}
