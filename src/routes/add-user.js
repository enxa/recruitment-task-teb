import { connectToDatabase } from '$lib/utils/db.js'

export const post = async e => {
  let user = await e.request.json()
  
  let dbQuery = [ user ]
  
  let database = await connectToDatabase()
  let result = await database.db('recruitment-task-teb').collection('users').insertOne(...dbQuery)

  return {
    body: result
  }
}

export const get = e => {
  return {
    body: {
      result: 'OK'
    }
  }
}