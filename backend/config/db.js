import mongoose from 'mongoose'

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required.')
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    if (error.name === 'MongoParseError') {
      throw new Error('MONGO_URI is not a valid MongoDB connection string. Copy the driver URI, which must begin with mongodb:// or mongodb+srv://.')
    }
    if (error.code === 8000 || /authentication failed|bad auth/i.test(error.message || '')) {
      throw new Error('MongoDB authentication failed. Check the database user credentials in MONGO_URI and URL-encode any special characters in the username or password.')
    }
    throw new Error('MongoDB connection failed. Check MONGO_URI and confirm the database is reachable.')
  }
}