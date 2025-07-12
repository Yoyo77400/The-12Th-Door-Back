import express from 'express';
import { MongooseService } from '../services/mongoose';

export class MatchController {
    private static instance: MatchController;
    public static getInstance(): MatchController {
        if (!this.instance) {
            this.instance = new MatchController();
        }
        return this.instance;
    }

    async createMatch(req: express.Request, res: express.Response): Promise<void> {
        const data = req.body.data;
        const mongooseService = await MongooseService.getInstance();
        const matchService = mongooseService.matchService;
        try {
            const match = await matchService.createMatch(data);
            res.status(201).json(match);
        } catch (error) {
            console.error("Error creating match:", error);
            res.status(500).json({ error: "Failed to create match" });
        }
    }
    
    buildRouter(): express.Router {
        const router = express.Router();
        router.post("/create", express.json(), this.createMatch.bind(this));
        return router;
    }
}