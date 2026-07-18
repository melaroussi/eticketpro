import excuteQuery from '../msdb-connexion';
import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  try {
    const result = await excuteQuery({
      query: 'SELECT host, port, secure, user, password, fromEmail FROM smtp_config WHERE id=1',
      values: [],
    });
    return NextResponse.json({ result: result[0] || {} });
  } 
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** POST Method */
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await excuteQuery({
      query: 'UPDATE smtp_config SET host=?, port=?, secure=?, user=?, password=?, fromEmail=? WHERE id=1',
      values: [data.host, parseInt(data.port), data.secure ? 1 : 0, data.user, data.password, data.fromEmail],
    });
    return NextResponse.json({ result });
  } 
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
