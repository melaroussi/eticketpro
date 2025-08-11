import excuteQuery from '../../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}

  try {
    let id = await request.nextUrl.searchParams.get("id");
    if (id){
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.id AS id, sells.datetime AS datetime, sells.quantity AS quantity, articles.category AS category, articles.price AS price, articles.label AS label, articles.VATRate AS VATRate, users.firstName AS firstName, users.lastName AS lastName FROM article_sells AS sells INNER JOIN articles as articles ON articles.id = sells.articleId INNER JOIN users ON users.id=sells.userId WHERE sells.id=?",
        values: [id],
      })
    }
    else{
      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT sells.id AS id, sells.datetime AS datetime, sells.quantity AS quantity, articles.category AS category, articles.price AS price, articles.label AS label, articles.VATRate AS VATRate FROM article_sells AS sells INNER JOIN articles as articles ON articles.id = sells.articleId ORDER BY datetime DESC",
        values: [],
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

/** POST Method */
export async function POST(request) {
  let result = {}

  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /**  Ticket Sell Operation */
    if (operation === "sell"){
      let data = await request.json();
      
      if (data){
        data.forEach(async function(item){
          /** Running SQL Query - Update Quantity */
          result = await excuteQuery({
            query: "UPDATE articles SET availableQuantity = availableQuantity - ? WHERE id = ?",
            values: [item.quantity, item.articleId],
          })
          /** Running SQL Query - Add Sell */
          result = await excuteQuery({
            query: 'INSERT INTO article_sells(quantity, articleId, paiementType, userId) VALUES(?, ?, ?, ?)',
            values: [item.quantity, item.articleId, item.paiementType, item.userId],
          })
        })
      }
    }
  }
  catch(error) {
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}