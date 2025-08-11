import excuteQuery from '../msdb-connexion';

import { NextResponse } from 'next/server';

export async function GET(request) {
  let result = {}
  let query = {}

  try {
    let id = await request.nextUrl.searchParams.get("id");
    
    if (id){
      query = {
        query: 'SELECT * FROM profiles WHERE id=?',
        values: [id],
      }
    }
    else{
      query = {
        query: 'SELECT * FROM profiles',
        values: [],
      }
    }
    result = await excuteQuery(query);
    return NextResponse.json({result});
  } 
  catch(error) {
    return NextResponse.json({error});
  }
}

export async function POST(request) {
  try {
    let data = await request.json()
    if (data){
      let query = {
        query: "INSERT INTO profiles(label, description) VALUES (?, ?)",
        values: [data.label, data.description],
      }
      result = await excuteQuery(query);
      return NextResponse.json({result});
    }
  } 
  catch(error) {
    return NextResponse.json({ error });
  }
}
 
export async function PUT(request) {
  let result = {};
  try {
    let id = await request.nextUrl.searchParams.get("id");
    console.log('DD')
    if (id){
      let data = await request.json();
      console.log(id)
      if (data){
        let query = {
          query: 'UPDATE profiles SET label=?, description=? WHERE id = ?',
          values: [data.label, data.description],
        }
        result = await excuteQuery(query);
        return NextResponse.json({result});
      }
    }
  }
  catch(error) {
    return NextResponse.json({error});
  }
}

export async function DELETE(request) {
  let result = {};
  try {
    let id = await request.nextUrl.searchParams.get("id");
    if (id){
      let query = {
        query: 'DELETE FROM profiles WHERE id=?',
        values: [id],
      }
      result = await excuteQuery(query);
      return NextResponse.json({result});
    }
  }
  catch(error) {
    return NextResponse.json({error});
  }
}