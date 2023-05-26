import mongoose from 'mongoose'

// const URI = process.env.MONGO_URI

// Replace 'your-atlas-connection-string' with the connection string for your MongoDB Atlas cluster
const atlasConnectionString = process.env.MONGO_URI

export default async function database() {
  mongoose
    .connect(atlasConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB Atlas')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error)
    })
}
