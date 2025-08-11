import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

/** GET Method */
export async function GET(request) {
  let result = {}
  
  try {
    let operation = await request.nextUrl.searchParams.get("operation")

    /** Get all operation */
    if (operation === "get-all"){
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile FROM users LEFT JOIN departments ON departments.id = users.departmentId',
        values: [],
      })
    }

    /** Get one operation */
    if (operation === "get-one"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.password, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.id=?',
        values: [id],
      })
    }

    /** Login operation */
    if (operation === "login"){
      let email = await request.nextUrl.searchParams.get("email");
      let password = await request.nextUrl.searchParams.get("password");

      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.password, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.email=? AND users.password=?",
        values: [email, password],
      })
console.log(operation)
console.log(result)
    }

    /** Login operation */
    if (operation === "recover"){
      let email = await request.nextUrl.searchParams.get("email");
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.password, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE email=?',
        values: [email],
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
    /** Create operation */
    if (operation === "create"){
      let data = await request.json()
      console.log(data)
      /** Running SQL Query */
      result = await excuteQuery({
        query: "INSERT INTO users(firstName, lastName, gender, email, phone, password, departmentId, profile, businessName, type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status],
      })
      console.log(result)
    }
    
    /** Create operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'UPDATE users SET firstName=?, lastName=?, gender=?, email=?, phone=?, password=?, departmentId=?, profile=?, businessName=?, type=?, status=? WHERE id = ?',
        values: [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status, id],
      })
    }
  } 
  catch(error) {
    console.log(error)
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}

/** DELETE Method */
export async function DELETE(request) {
  let result = {}
  
  try {
    let id = await request.nextUrl.searchParams.get("id");
    /** Running SQL Query */
    result = await excuteQuery({
      query: 'DELETE FROM users WHERE id=?',
      values: [id],
    })
  } 
  catch(error) {
    return NextResponse.json({ error });
  }
  finally{
    return NextResponse.json({ result });
  }
}
