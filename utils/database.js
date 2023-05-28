import mongoose from 'mongoose'

// Replace 'your-atlas-connection-string' with the connection string for your MongoDB Atlas cluster
const atlasConnectionString = process.env.ATLAS_MONGO_URI

const connectDB = async () => {
  try {
    mongoose.connect(atlasConnectionString)
    console.log('Conexão com o MongoDB estabelecida.')
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
