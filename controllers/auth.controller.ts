import { Router, Request, Response } from 'express'
import { loginWithWallet } from '../services/auth.service'

export class AuthController {
  private static instance: AuthController
  private router: Router

  private constructor() {
    this.router = Router()
    this.router.post('/socios-login', this.sociosLogin)
  }

  public static getInstance(): AuthController {
    if (!this.instance) {
      this.instance = new AuthController()
    }
    return this.instance
  }

  public buildRouter(): Router {
    return this.router
  }

  private async sociosLogin(req: Request, res: Response) {
    const { walletAddress } = req.body
    if (!walletAddress) return res.status(400).json({ error: 'walletAddress requis' })

    try {
      const result = await loginWithWallet(walletAddress)
      return res.json(result)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erreur serveur' })
    }
  }
}
