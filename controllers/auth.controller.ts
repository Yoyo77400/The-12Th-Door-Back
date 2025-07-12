import express from 'express'
import { loginWithWallet } from '../services/auth.service'

export class AuthController {
  private static instance: AuthController

  public static getInstance(): AuthController {
    if (!this.instance) {
      this.instance = new AuthController()
    }
    return this.instance
  }

  private async sociosLogin(req: express.Request, res: express.Response): Promise<void> {
    const { walletAddress }  = req.body
    if (!walletAddress) {
      res.status(400).end()
      return;
    }

    try {
      const result = await loginWithWallet(walletAddress)
      res.json(result);
      return ;
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Erreur serveur' })
      return
    }
  }

  public buildRouter(): express.Router {
    const router = express.Router()
    router.post('/login',express.json(), this.sociosLogin.bind(this))
    return router
  }
}
