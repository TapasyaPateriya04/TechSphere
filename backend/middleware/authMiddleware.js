import jwt from 'jsonwebtoken'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
}

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Authentication required.' })

  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id
    return next()
  } catch {
    res.clearCookie('token', cookieOptions)
    return res.status(401).json({ message: 'Session expired. Please log in again.' })
  }
}
