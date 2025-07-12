import express from 'express';
import { MongooseService } from '../services/mongoose';
import adminMiddleware from '../middlewares/admin.middleware';

export class SeasonController {
    private static instance: SeasonController;

    public static getInstance(): SeasonController {
        if (!this.instance) {
            this.instance = new SeasonController();
        }
        return this.instance;
    }

    async createSeason(req: express.Request, res: express.Response): Promise<void> {
        const season  = req.body.season;
        const mongooseService = await MongooseService.getInstance();
        const seasonService = mongooseService.seasonService;
        try {
            const newSeason = await seasonService.createSeason(season);
            res.status(201).json(season);
        } catch (error) {
            res.status(500).json({ error: "Failed to create season" });
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post('/create',express.json(), adminMiddleware(), this.createSeason.bind(this));
        return router;
    }
}