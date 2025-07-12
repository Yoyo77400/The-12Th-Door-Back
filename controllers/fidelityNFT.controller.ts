import express from "express";
import { MongooseService } from "../services/mongoose";
import adminMiddleware from "../middlewares/admin.middleware";

export class FidelityNFTController {
    private static instance: FidelityNFTController;

    public static getInstance(): FidelityNFTController {
        if (!this.instance) {
            this.instance = new FidelityNFTController();
        }
        return this.instance;
    }

    async createFidelityNFT(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const data  = {
            ...req.body.data,
            seasonId : new mongooseService.mongoose.Types.ObjectId(req.body.data.seasonId),
        }
        const fidelityNFTService = mongooseService.fidelityNFTService;
        try {
            const fidelityNFT = await fidelityNFTService.createFidelityNFT(data);
            res.status(201).json(fidelityNFT);
        } catch (error) {
            res.status(500).json({ error: "Failed to create Fidelity NFT" });
        }
    }

    async getFidelityNFTByWalletAddressAndSeasonId(req: express.Request, res: express.Response): Promise<void> {
        const { walletAddress, seasonId } = req.params;
        const mongooseService = await MongooseService.getInstance();
        const fidelityNFTService = mongooseService.fidelityNFTService;
        try {
            const fidelityNFT = await fidelityNFTService.getFidelityNFTByWalletAddressAndSeasonId(walletAddress, seasonId);
            if (!fidelityNFT) {
                res.status(404).json({ error: "Fidelity NFT not found" });
                return;
            }
            res.json(fidelityNFT);
        } catch (error) {
            console.error("Error fetching Fidelity NFT:", error);
            res.status(500).json({ error: "Failed to fetch Fidelity NFT" });
        }
    }
    
    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/create",express.json(), this.createFidelityNFT.bind(this));
        router.get("/:walletAddress/:seasonId",express.json(), this.getFidelityNFTByWalletAddressAndSeasonId.bind(this));
        return router;
    }
}



