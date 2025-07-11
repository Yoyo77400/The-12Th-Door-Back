import { UserService, MongooseService } from "./mongoose"
import { generateToken } from '../utils/jwt'

export async function loginWithWallet(walletAddress: string) {
  const mongooseService = await MongooseService.getInstance();
  const userService = mongooseService.userService;
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  let user = await userService.getUserByPublicKey(walletAddress);
  if (!user) {
    user = await userService.createUser({
      walletAddress,
      isAdmin: false,
    }, walletAddress);
    console.log('New user created:', user);
  }
  const token = generateToken({ walletAddress })
  return { token, walletAddress }
}
