import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const backendUrl = (process.env.BACKEND_API_URL || 'http://backend:8000') + '/api/manager/dashboard';
    const res = await fetch(backendUrl, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}
