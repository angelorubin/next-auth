import mongoose from 'mongoose'

// Replace 'your-atlas-connection-string' with the connection string for your MongoDB Atlas cluster
const atlasConnectionString = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose
      .connect(atlasConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Conexão estabelecida com sucesso ao MongoDB Atlas!')
      })
      .catch((error) => {
        console.error('Erro ao conectar ao MongoDB Atlas:', error)
      })
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message)
    // process.exit(1)
  }
}

export default connectDB
