import express from "express";
import { MongooseService } from "../services/mongoose";
import adminMiddleware from "../middlewares/admin.middleware";

export class MatchNFTController {
  private static instance: MatchNFTController;
  public static getInstance(): MatchNFTController {
    if (!this.instance) {
      this.instance = new MatchNFTController();
    }
    return this.instance;
  }

  async createMatchNFT(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
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
      const updateMatchNFT = await matchNFTService.setRarity(id);
      if (!updateMatchNFT) {
        res
          .status(404)
          .json({ error: "Match NFT not found for rarity update" });
        return;
      }
      res.status(200).json(updateMatchNFT);
    } catch (error) {
      console.error("Error setting match NFT as minted:", error);
      res.status(500).json({ error: "Failed to set match NFT as minted" });
    }
  }

  async getByMatchIdAndWalletAddress(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { matchId, walletAddress } = req.params;
    const mongooseService = await MongooseService.getInstance();
    const matchNFTService = mongooseService.matchNFTService;
    const matchService = mongooseService.matchService;
    const match = await matchService.getById(matchId);

    try {
      const matchNFT = await matchNFTService.getByMatchIdAndWalletAddress(
        matchId,
        walletAddress
      );
      if (!matchNFT) {
        res.status(404).json({ error: "Match NFT not found" });
        return;
      }
      res.json({
        name: `Match NFT #${matchNFT._id}`,
        description: `NFT souvenir du match ${match?.homeTeam} - ${
          match?.awayTeam
        } joué le ${match?.matchDate.toLocaleDateString("fr-FR")}`,
        image: matchNFT.mediaUrl,
        attributes: [
          {
            trait_type: "Match",
            value: `${match?.homeTeam} - ${match?.awayTeam}`,
          },
          {
            trait_type: "Date",
            value: match?.matchDate.toISOString().split("T")[0],
          },
          {
            trait_type: "Minted",
            value: matchNFT.isMinted ? "Yes" : "No",
          },
          {
            trait_type: "Rarity",
            value: matchNFT.rarity || "Common",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching match NFT:", error);
      res.status(500).json({ error: "Failed to fetch match NFT" });
    }
  }

  async setRarity(req: express.Request, res: express.Response): Promise<void> {
    const _id = req.params.id;

    console.log("Received id for setRarity:", req.params.id); // Important pour debug

    if (!_id) {
      res.status(400).json({ error: "Missing ID parameter" });
      return;
    }
    const mongooseService = await MongooseService.getInstance();
    const matchNFTService = mongooseService.matchNFTService;

    try {
      const matchNFT = await matchNFTService.setRarity(_id);
      if (!matchNFT) {
        console.error("Match NFT not found for rarity update:", _id);
        return;
      }
      console.log("Match NFT rarity updated:", matchNFT);
      res.status(200).json(matchNFT);
      return;
    } catch (error) {
      console.error("Error updating match NFT rarity:");
      return;
    }
  }

  buildRouter(): express.Router {
    const router = express.Router();
    router.post("/create", express.json(), this.createMatchNFT.bind(this));
    router.post("/:id/set-minted", express.json(), this.setMinted.bind(this));
    router.get(
      "/:matchId/:walletAddress",
      this.getByMatchIdAndWalletAddress.bind(this)
    );
    router.post(
      "/:id/set-rarity",
      express.json(),
      adminMiddleware(),
      this.setRarity.bind(this)
    );
    return router;
  }
}
