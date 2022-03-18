import { connectToDatabase } from '$lib/utils/db.js'

export let get = async e => {
  let skip  = Number(e.url.searchParams.get('skip'))
  let limit = Number(e.url.searchParams.get('limit'))
  let sortType = Number(e.url.searchParams.get('sort-type'))
  let valueToSort = String(e.url.searchParams.get('value-to-sort'))
  let sortBy = ``
  
  sortBy = JSON.parse(`{"${valueToSort}": "${sortType || 1}"}`)

  let dbQuery = [
    { },
    { projection: { _id: 0, email: 0, password: 0, phone: 0, education: 0, correspondenceAddress: 0, residenceAddress: 0 } }
  ]

  let database = await connectToDatabase()
  let result = await database.db('recruitment-task-teb').collection('users').find(...dbQuery)
  .skip(skip)
  .limit(limit)
  .sort(sortBy)
  .toArray()

  return {
    body: result
  }
}