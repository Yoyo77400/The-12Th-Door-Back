import { Router } from 'express';
import { MongooseService } from '../services/mongoose';


export class UniqController {
    private static instance: UniqController;

    public static getInstance(): UniqController {
        if (!this.instance) {
            this.instance = new UniqController();
        }
        return this.instance;
    }}

    public buildRouter(): Router {
        const router = Router();
        router.post('/uniqs', express.json(), this.insertUniq.bind(this));
        return router;
    }