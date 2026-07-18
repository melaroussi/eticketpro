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
        query: "SELECT supplies.id AS 'supplyId', supplies.supplyQuantity AS 'supplyQuantity', supplyQuantity, supplyDatetime AS 'supplyDatetime', supplies.comment AS 'comment', articles.reference AS 'articleReference', articles.category AS 'category', articles.label AS 'label', articles.availableQuantity AS 'availableQuantity', users.firstName AS 'firstName', users.lastName AS 'lastName' FROM supplies INNER JOIN articles ON supplies.articleId = articles.id INNER JOIN users ON supplies.userId = users.id WHERE supplies.id = ?",
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT supplies.id AS 'supplyId', availableQuantity AS 'availableQuantity', supplyDatetime AS 'supplyDatetime', supplyQuantity, articles.reference AS 'articleReference', articles.category AS 'category', articles.label AS 'label', articles.availableQuantity AS 'availableQuantity', users.firstName AS 'firstName', users.lastName AS 'lastName' FROM supplies INNER JOIN articles ON supplies.articleId = articles.id INNER JOIN users ON supplies.userId = users.id ORDER BY supplyDatetime DESC",
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
      /** Running SQL Query - Update Quantity */
      result = await excuteQuery({
        query: "UPDATE articles SET availableQuantity = availableQuantity + ? WHERE id = ?",
        values: [data.supplyQuantity, data.articleID],
      })
      /** Running SQL Query - Add Supply */
      result = await excuteQuery({
        query: "INSERT INTO supplies(articleID, userId, supplyQuantity, comment) VALUES (?, ?, ?, ?)",
        values: [data.articleID, data.userId, data.supplyQuantity, data.comment],
      })
    }
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      console.log(data, id)
      
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE readers SET label=?, ip=?, zoneId=? WHERE id=?',
        values: [data.label, data.ip, data.zoneId, id],
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
      query: 'DELETE FROM readers WHERE id=?',
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}