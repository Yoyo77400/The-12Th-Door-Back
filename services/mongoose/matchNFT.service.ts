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
}
