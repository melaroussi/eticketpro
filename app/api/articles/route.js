import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Read operation */
    if (id){
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT * FROM articles WHERE id=?',
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT * FROM articles',
        values: [],
      })
    }
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
    /** Create operation */
    if (operation === "create"){
      let data = await request.json()
      console.log(data)
      /** Running SQL Query */
      result = await excuteQuery({
        query: "INSERT INTO articles(reference, category, label, price, VATRate, warehousing, availableQuantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.reference, data.category, data.label, data.price, data.VATRate, data.warehousing, data.availableQuantity, data.description, data.image],
      })
    }
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE articles SET reference=?, category=?, label=?, price=?, VATRate=?, warehousing=?, availableQuantity=?, description=?, image=? WHERE id = ?',
        values: [data.reference, data.category, data.label, data.price, data.VATRate, data.warehousing, data.availableQuantity, data.description, data.image, id],
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
      query: 'DELETE FROM articles WHERE id=?',
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}