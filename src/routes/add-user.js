import bcrypt from 'bcryptjs'
import { connectToDatabase } from '$lib/utils/db.js'

export const post = async e => {
  let body = await e.request.json()
  
  let dbQuery = [ body ]

  let database = await connectToDatabase()

  // check if user exists
  let user = await database.db('recruitment-task-teb').collection('users').findOne({email: body.email})
  if (user) return {
    body: {
      auth: 'Email zarezerwowany'
    }
  }
  // hash password
  let hashed = await bcrypt.hash(body.password, 10)
  if (!hashed) return {
    body: {
      auth: 'Błąd szyfrowana'
    }
  }
  // save user to db
  let result = await database.db('recruitment-task-teb').collection('users').insertOne(...dbQuery)
  if (result.acknowledged) return {
    body
  }
}

export const get = e => {
  return {
    body: {
      result: 'OK'
    }
  }
}