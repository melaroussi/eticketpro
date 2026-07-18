import excuteQuery from '../msdb-connexion';
import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const userId = request.nextUrl.searchParams.get("userId");
    const qrCode = request.nextUrl.searchParams.get("qrCode");

    if (id) {
      const result = await excuteQuery({
        query: 'SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id WHERE p.id=?',
        values: [id],
      });
      return NextResponse.json({ result: result[0] || {} });
    }

    if (userId) {
      const result = await excuteQuery({
        query: 'SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id WHERE p.userId=?',
        values: [userId],
      });
      return NextResponse.json({ result });
    }

    if (qrCode) {
      const result = await excuteQuery({
        query: 'SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id WHERE p.qrCode=?',
        values: [qrCode],
      });
      return NextResponse.json({ result: result[0] || {} });
    }

    const result = await excuteQuery({
      query: 'SELECT p.*, u.firstName, u.lastName, u.email FROM pass_subscriptions p INNER JOIN users u ON p.userId = u.id',
      values: [],
    });
    return NextResponse.json({ result });
  } 
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** POST Method */
export async function POST(request) {
  try {
    const data = await request.json();
    const operation = request.nextUrl.searchParams.get("operation");

    if (operation === "update-status") {
      const { id, status } = data;
      const result = await excuteQuery({
        query: 'UPDATE pass_subscriptions SET status=? WHERE id=?',
        values: [status, id],
      });
      return NextResponse.json({ result });
    }

    // Default: Create subscription
    const { userId, passType } = data;
    const qrCode = `PASS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const startDate = new Date().toISOString().split('T')[0];
    
    // 1 year validity
    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);
    const endDate = end.toISOString().split('T')[0];

    const result = await excuteQuery({
      query: 'INSERT INTO pass_subscriptions (userId, passType, startDate, endDate, qrCode, status) VALUES (?, ?, ?, ?, ?, ?)',
      values: [userId, passType, startDate, endDate, qrCode, 'Actif'],
    });

    return NextResponse.json({ result: { ...result, qrCode, startDate, endDate } });
  } 
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** DELETE Method */
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const result = await excuteQuery({
      query: 'DELETE FROM pass_subscriptions WHERE id=?',
      values: [id],
    });
    return NextResponse.json({ result });
  } 
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
