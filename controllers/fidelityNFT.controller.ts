import express from "express";
import { FidelityNFTService, MongooseService } from "../services/mongoose";
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

    private getFidelityLevelName(level: number): string {
        switch (level) {
            case 1: return "Bronze";
            case 2: return "Silver";
            case 3: return "Gold";
            case 4: return "Platinum";
            default: return "Unknown";
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
            res.json({
            name: `Fan NFT #${fidelityNFT._id}`,
            description: `NFT de fidélité pour la saison ${fidelityNFT.seasonId}`,
            image: fidelityNFT.mediaUrl,
            attributes: [
                {
                trait_type: "Fidelity Level",
                value: this.getFidelityLevelName(fidelityNFT.fidelityLevel),
                },
                {
                trait_type: "Points",
                value: fidelityNFT.fidelityPoints,
                },
                {
                trait_type: "Match NFTs Minted",
                value: fidelityNFT.matchNFTMinted,
                },
                {
                trait_type: "Season",
                value: fidelityNFT.seasonId,
                }
            ]
            });

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



