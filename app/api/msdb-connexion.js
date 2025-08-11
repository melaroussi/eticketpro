import mysql from 'serverless-mysql';

let db = null;

try {
  db = mysql({
    config: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  })
} 
catch (error) {
  console.log(error);
}

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } 
  catch (error) {
    return error;
  }
}