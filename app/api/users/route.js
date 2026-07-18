import excuteQuery from '../msdb-connexion';
import sendEmail from '../send-email';

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
        query: 'SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId',
        values: [],
      })
    }

    /** Get one operation */
    if (operation === "get-one"){
      let id = await request.nextUrl.searchParams.get("id");
      /** Running SQL Query */
      result = await excuteQuery({
        query: 'SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.password, users.gender, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.id=?',
        values: [id],
      })
    }

    /** Login operation */
    if (operation === "login"){
      let email = await request.nextUrl.searchParams.get("email");
      let password = await request.nextUrl.searchParams.get("password");

      /** Running SQL Query */
      result = await excuteQuery({
        query: "SELECT users.id, users.firstName, users.lastName, users.email, users.phone, users.gender, users.password, users.businessName, users.type, users.status, users.departmentId as departmentId, departments.label as department, users.profile as profile, users.allowedModules as allowedModules FROM users LEFT JOIN departments ON departments.id = users.departmentId WHERE users.email=? AND users.password=?",
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
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

/** POST Method */
export async function POST(request) {
  try {
    let operation = await request.nextUrl.searchParams.get("operation")
    /** Create operation */
    if (operation === "create"){
      let data = await request.json()
      console.log(data)
      /** Running SQL Query */
      const result = await excuteQuery({
        query: "INSERT INTO users(firstName, lastName, gender, email, phone, password, departmentId, profile, businessName, type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status],
      })
      console.log(result)
      
      // Async send registration email if success
      if (result && result.insertId) {
        sendEmail({
          to: data.email,
          subject: "Bienvenue sur e-Ticket Pro !",
          html: `<h3>Bonjour ${data.firstName} ${data.lastName},</h3>
                 <p>Votre compte e-Ticket Pro a été créé avec succès.</p>
                 <p><strong>Identifiant (Email) :</strong> ${data.email}</p>
                 <p><strong>Profil :</strong> ${data.profile}</p>
                 <br/>
                 <p>L'équipe e-Ticket Pro</p>`
        }).catch(err => console.error("Email send failed:", err));
      }
      
      return NextResponse.json({ result });
    }
    
    /** Update operation */
    if (operation === "update"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Running SQL Query */
      const result = await excuteQuery({
        query: 'UPDATE users SET firstName=?, lastName=?, gender=?, email=?, phone=?, password=?, departmentId=?, profile=?, businessName=?, type=?, status=? WHERE id = ?',
        values: [data.firstName, data.lastName, data.gender, data.email, data.phone, data.password, data.departmentId, data.profile, data.businessName, data.type, data.status, id],
      })
      return NextResponse.json({ result });
    }

    /** Update permissions operation */
    if (operation === "update-permissions"){
      let id = await request.nextUrl.searchParams.get("id");
      let data = await request.json();
      /** Running SQL Query */
      const result = await excuteQuery({
        query: 'UPDATE users SET allowedModules=? WHERE id = ?',
        values: [data.allowedModules, id],
      })
      return NextResponse.json({ result });
    }
    
    return NextResponse.json({ result: {} });
  } 
  catch(error) {
    console.error(error);
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
      query: 'DELETE FROM users WHERE id=?',
      values: [id],
    })
    return NextResponse.json({ result });
  }
  catch(error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
