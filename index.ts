import express from 'express';
const cors = require('cors');
import { config } from 'dotenv';
import { MongooseService } from './services/mongoose';
import { AuthController, SeasonController, FidelityNFTController, MatchController } from './controllers/index';

config();

function launchAPI() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  app.use('/auth', AuthController.getInstance().buildRouter());
  app.use('/season', SeasonController.getInstance().buildRouter());
  app.use('/fidelity-nft', FidelityNFTController.getInstance().buildRouter());
  app.use('/match', MatchController.getInstance().buildRouter());

  app.get('/', (req, res) => {
    res.send('Welcome to The12ThDoor API');
  });

  app.listen(process.env.PORT, async () => {
    console.log(`The12ThDoor API is running on port ${port}`);
  });
}

async function setupAPI() {
    const mongooseService = await MongooseService.getInstance();
    const userService = mongooseService.userService;
    const rootUser = await userService.getRootUser();
    if (!rootUser) {
        if (!process.env.ROOT_PUBLIC_KEY) {
            throw new Error('ROOT_PUBLIC_KEY environment variable is not set');
        }
        const user = await userService.createUser({
            walletAddress: process.env.ROOT_PUBLIC_KEY,
            isAdmin: true,

        }, process.env.ROOT_PUBLIC_KEY);
        console.log('Root user created:', user);
    } else {
        console.log('Root user already exists');
    }
}

async function main() {
  await setupAPI();
  launchAPI();
}

main().catch((error) => {
  console.error('Error starting The12ThDoor API:', error);
  process.exit(1);
});