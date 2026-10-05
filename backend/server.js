import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('TechSphere Backend Running')
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = error.status || (error.name === 'ValidationError' ? 400 : 500)
  if (status >= 500) console.error(error)
  return res.status(status).json({ message: status >= 500 ? 'Something went wrong.' : error.message })
})

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be configured and contain at least 32 characters.')
}

await connectDB()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
