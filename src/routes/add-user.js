// import { connectToDatabase } from '$lib/utils/db.js'

// export let post = async e => {
  // let bedrooms  = Number(query.get('bedrooms'))
  // let bathrooms = Number(query.get('bathrooms'))
//   let skip  = Number(e.url.searchParams.get('skip'))
//   let limit = Number(e.url.searchParams.get('limit'))
//   // console.log('skip', skip)

//   let dbQuery = [
//     { },
//     { projection: { _id: 0 } }
//   ]

//   let database = await connectToDatabase()
//   let result = await database.db('english-tests').collection('words-by-meaning').find(...dbQuery)
//   .skip(skip)
//   .limit(limit)
//   .toArray()

//   return {
//     body: result
//   }
// }
//   console.log('e', e)
// }
import { usersStore } from "./users-store"

export const post = async e => {
  let body = await e.request.json()

  return {
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