import dotenv from 'dotenv'
dotenv.config()

import { verifyToken } from './middlewares/auth.middleware'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { AuthController } from './controllers/auth.controller'




const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/auth', AuthController.getInstance().buildRouter())

app.get('/me', verifyToken, (req, res) => {
  // @ts-ignore
  res.json({ message: 'Tu es authentifié ', user: req.user })
})


mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Mongo connecté')
    app.listen(port, () => {
      console.log(`API en ligne sur http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.error('Erreur MongoDB :', err)
    process.exit(1)
  })
