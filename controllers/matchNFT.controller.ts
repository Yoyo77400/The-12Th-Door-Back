import express from 'express';
import { MongooseService } from '../services/mongoose';

export class MatchNFTController {
    private static instance: MatchNFTController;
    public static getInstance(): MatchNFTController {
        if (!this.instance) {
            this.instance = new MatchNFTController();
        }
        return this.instance;
    }

    async createMatchNFT(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body.data;
        const mongooseService = await MongooseService.getInstance();
        const matchNFTService = mongooseService.matchNFTService;
        try {
            const matchNFT = await matchNFTService.createMatchNFT(data);
            res.status(201).json(matchNFT);
        } catch (error) {
            console.error("Error creating match:", error);
            res.status(500).json({ error: "Failed to create match" });
        }
    }

    async setMinted(req: express.Request, res: express.Response): Promise<void> {
        const { id } = req.params;
        const mongooseService = await MongooseService.getInstance();
        const matchNFTService = mongooseService.matchNFTService;
        try {
            const matchNFT = await matchNFTService.setMinted(id);
            if (!matchNFT) {
                res.status(404).json({ error: "Match NFT not found" });
                return;
            }
            res.status(200).json(matchNFT);
        } catch (error) {
            console.error("Error setting match NFT as minted:", error);
            res.status(500).json({ error: "Failed to set match NFT as minted" });
        }
    }
    
    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/create", express.json(), this.createMatchNFT.bind(this));
        router.post("/:id/set-minted", express.json(), this.setMinted.bind(this));
        return router;
    }
}