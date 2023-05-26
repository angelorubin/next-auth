import mongoose from 'mongoose'

// Replace 'your-atlas-connection-string' with the connection string for your MongoDB Atlas cluster
const atlasConnectionString = process.env.ATLAS_MONGO_URI

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
