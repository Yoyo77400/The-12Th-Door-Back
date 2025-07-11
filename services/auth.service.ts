import User from '../models/user.model'
import { generateToken } from '../utils/jwt'

export async function loginWithWallet(walletAddress: string) {
  let user = await User.findOne({ walletAddress })
  if (!user) {
    user = new User({ walletAddress })
    await user.save()
  }

  const token = generateToken({ walletAddress })
  return { token, walletAddress }
}
