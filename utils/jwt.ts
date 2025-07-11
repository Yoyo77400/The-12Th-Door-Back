import jwt from 'jsonwebtoken'


export function generateToken(payload: object): string {
  const JWT_SECRET = process.env.JWT_SECRET
  console.log('JWT_SECRET', JWT_SECRET)
  if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in .env file')
}
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })
}
