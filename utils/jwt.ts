import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) throw new Error('JWT_SECRET manquant dans .env')


export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })
}
