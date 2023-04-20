import mongoose from 'mongoose'

const URI =
  'mongodb+srv://jonsmota:xy84KNyouyua3pT3@t25.o9u6ti8.mongodb.net/?retryWrites=true&w=majority'

const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', false)
    global.mongoose = await mongoose.connect(URI)
  }
}

export default databaseConnection
