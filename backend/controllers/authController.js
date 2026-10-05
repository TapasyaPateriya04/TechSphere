import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
}

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
})

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const registerUser = async (req, res, next) => {
  try {
    const username = typeof req.body.username === 'string' ? req.body.username.trim().toLowerCase() : ''
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''

    if (!/^[a-z0-9_.-]{3,24}$/.test(username)) {
      return res.status(400).json({ message: 'Username must be 3–24 characters and use letters, numbers, dots, dashes, or underscores.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' })
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: 'Password must be between 8 and 128 characters.' })
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) {
      return res.status(409).json({
        message: existing.email === email ? 'Email is already registered.' : 'Username is already taken.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ username, email, password: hashedPassword })
    res.cookie('token', createToken(user._id), cookieOptions)
    return res.status(201).json({ user: publicUser(user) })
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Email or username is already registered.' })
    return next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is incorrect.' })
    }

    res.cookie('token', createToken(user._id), cookieOptions)
    return res.json({ user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(401).json({ message: 'Account not found.' })
    return res.json({ user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token', cookieOptions)
  return res.json({ message: 'Logged out successfully.' })
}
