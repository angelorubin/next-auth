import User from '../models/user'

export async function userRetrieve(email) {
  await databaseConnection()
  const user = await User.find({ email })
  return user
}
