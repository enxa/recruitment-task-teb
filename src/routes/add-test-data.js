import { v4 as uuidv4 } from 'uuid'
import { connectToDatabase } from '$lib/utils/db.js'

export const post = async e => {
  let body = await e.request.json()
  
  let user = {}
  let users = []
  let userType = ''
  let phone = ''
  let code = ''
  let number = ''

  code = `${(Math.random()*10).toFixed()}${(Math.random()*10).toFixed()}-${(Math.random()*10).toFixed()}${(Math.random()*10).toFixed()}${(Math.random()*10).toFixed()}`
  number = `${(Math.random()*10).toFixed()}${(Math.random()*10).toFixed()}/${(Math.random()*10).toFixed()}${(Math.random()*10).toFixed()}`

  let database = await connectToDatabase()
  
  for (let i = 0; i < 9; i++) {
    phone += (Math.random()*10).toFixed()
  }
  
  for (let i = 0; i < body; i++) {
    Math.random() > 0.5 ? userType = 'Wykładowca' : userType = 'Pracownik administracyjny'
    
    if (userType === 'Wykładowca') {
      user = {
        name: `${uuidv4()}`,
        surname: `${uuidv4()}`,
        email: `${uuidv4()}@teb.pl`,
        password: `${uuidv4()}`,
        userType: `Wykładowca`,
        phone: `${phone}`,
        education: `Profesor`,
      }
    }

    if (userType === 'Pracownik administracyjny') {
      user = {
        name: `${uuidv4()}`,
        surname: `${uuidv4()}`,
        email: `${uuidv4()}@teb.pl`,
        password: `${uuidv4()}`,
        userType: `Pracownik administracyjny`,
        correspondenceAddress: {
          voivodship: `${uuidv4()}`, 
          city: `${uuidv4()}`,
          code: `${code}`, 
          street: `${uuidv4()}`,
          number: `${number}`
        },
        residenceAddress: {
          voivodship: `${uuidv4()}`, 
          city: `${uuidv4()}`,
          code: `${code}`, 
          street: `${uuidv4()}`,
          number: `${number}`
        }
      }
    }

    if (user) await database.db('recruitment-task-teb').collection('users').insertOne(user)
  }
}

export const del = async e => {
  let database = await connectToDatabase()
  let result = await database.db('recruitment-task-teb').collection('users').deleteMany({})

  return {
    result
  }
}