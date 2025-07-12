import { IMatchNFT, IFidelityNFT } from "../../models";
import { MatchNFTSchema, FidelityNFTSchema } from "./schemas/index";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateMatchNFT = Omit<IMatchNFT, "_id">;

export class MatchNFTService {
    readonly mongooseService: MongooseService;
    readonly matchNFTModel: Model<IMatchNFT>;
    readonly fidelityNFTModel: Model<IFidelityNFT>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.matchNFTModel = mongooseService.mongoose.model(Models.MatchNFT, MatchNFTSchema);
    this.fidelityNFTModel = mongooseService.mongoose.model(Models.FidelityNFT, FidelityNFTSchema);
  }

  async createMatchNFT(data: ICreateMatchNFT): Promise<IMatchNFT> {
    console.log("Creating match NFT with data:", data);
    const matchNFT = await this.matchNFTModel.create(data);
    return matchNFT;
  }

  async updateMediaUrl(nftId: string, url: string): Promise<void> {
    await this.matchNFTModel.findByIdAndUpdate(nftId, {
    mediaUrl: url
    }).exec();
  }

  async setMinted(id: string): Promise<IMatchNFT | null> {
    const matchNFT = await this.matchNFTModel.findById(id);
    if (!matchNFT) {
      return null;
    }
    if (matchNFT.isMinted) {
      console.log("Match NFT is already minted:", matchNFT);
      return matchNFT;
    }
  
    matchNFT.updateOne({ isMinted: true }).exec();
    
    const fidelityNFT = await this.fidelityNFTModel.findOneAndUpdate(
      {
        walletAddress: matchNFT.walletAddress, 
        seasonId: matchNFT.seasonId 
      },
      {
        $inc: { matchNFTMinted: 1 }
      },
      {
        new: true,
        upsert: false
      });
    console.log("Fidelity NFT updated with matchNFTMinted:", fidelityNFT);
    return matchNFT;
  }

  async getByMatchIdAndWalletAddress(matchId: string, walletAddress: string): Promise<IMatchNFT | null> {
    const matchNFT = this.matchNFTModel.findOne({ 
      matchId : matchId,
      walletAddress: walletAddress
    }).exec();
    if (!matchNFT) {
      console.log("Match NFT not found for matchId:", matchId);
      return null;
    }
    return matchNFT;
  }

  async setRarity(_id: string): Promise<IMatchNFT | null> {
    const chance = Math.random() * 1000;
    let rarity: string;
    if (chance < 1) {
      rarity = 'legendary';
    } else if (chance > 1 && chance < 100) {
      rarity = 'epic';
    } else if (chance > 100 && chance < 400) {
      rarity = 'rare';
    } else {
      rarity = 'common';
    }
    console.log("Setting rarity for Match NFT:", _id, "Rarity:", rarity);
    const updatedMatchNFT = await this.matchNFTModel.findByIdAndUpdate(_id, { rarity }, { new: true }).exec();
    if (!updatedMatchNFT) {
      console.log("Failed to update Match NFT rarity for id:", _id);
      return null;
    }
    console.log("Match NFT rarity updated successfully:", updatedMatchNFT);
    return updatedMatchNFT;
  }
}
