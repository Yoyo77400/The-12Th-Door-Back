import { MongooseService } from "../services/mongoose";
import express from "express";

export default function adminMiddleware() : express.RequestHandler {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const mongooseService = await MongooseService.getInstance();
        const userService = mongooseService.userService;
        const userWallet = req.params.walletAddress || req.body.walletAddress;
        if (!userWallet) {
            return res.status(400).json({ error: "UserWallet is required" });
        }
        try {
            const user = await userService.getUserByWalletAddress(userWallet);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if (!user.isAdmin) {
                return res.status(403).json({ error: "Unauthorized" });
            }
            next();
        } catch (error) {
            console.error("Error in admin middleware:", error);
            res.status(500).json({ error: "Internal server error" });
        }     
    };
}