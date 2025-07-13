import { Router, Request, Response } from "express";
import express from "express";
import { MongooseService } from "../services/mongoose";

export class UniqController {
  private static instance: UniqController;

  public static getInstance(): UniqController {
    if (!this.instance) {
      this.instance = new UniqController();
    }
    return this.instance;
  }

  public buildRouter(): Router {
    const router = Router();
    router.post("/", express.json(), this.insertUniq.bind(this));
    return router;
  }

  public async insertUniq(req: Request, res: Response) {
    try {
      const uniqData = req.body;
      const newUniq = await MongooseService.getInstance();
      const uniqService = newUniq.uniqService;
      uniqService.createUniq(uniqData);
      res.status(201).json(newUniq);
    } catch (error) {
      console.error("Error creating uniq:", error);
      res.status(500).json({
        message: "Failed to create uniq",
        error: (error as Error).message,
      });
    }
  }
}
