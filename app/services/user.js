import User from '../models/user'
import databaseConnection from '../utils/database'

export async function userCreate(email) {
  return null
}

export async function userRetrieve(email) {
  await databaseConnection()
  const user = await User.find({ email })
  return user
}
