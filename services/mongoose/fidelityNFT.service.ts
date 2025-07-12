import { IFidelityNFT, FidelityLevel } from "../../models";
import { FidelityNFTSchema } from "./schemas/fidelityNFT.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateFidelityNFT = Omit<IFidelityNFT, "_id">;

export class FidelityNFTService {
    readonly mongooseService: MongooseService;
    readonly fidelityNFTModel: Model<IFidelityNFT>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.fidelityNFTModel = mongooseService.mongoose.model<IFidelityNFT>(Models.FidelityNFT, FidelityNFTSchema);
  }

  async createFidelityNFT(data: ICreateFidelityNFT ): Promise<IFidelityNFT> {
    const fidelityNFT = await this.fidelityNFTModel.create(data);
    return fidelityNFT;
  }

  async updateMediaUrl(nftId: string, url: string): Promise<void> {
    await this.fidelityNFTModel.findByIdAndUpdate(nftId, {
    mediaUrl: url
    }).exec();
  }


  async implementMatchNFTMinted(id: string, matchNFTMinted: number): Promise<IFidelityNFT | null> {
    const fidelityNFT = await this.fidelityNFTModel.findByIdAndUpdate(id, { matchNFTMinted }, { new: true }).exec();
    return fidelityNFT;
  }

  async getFidelityNFTById(id: string): Promise<IFidelityNFT | null> {
    const fidelityNFT = await this.fidelityNFTModel.findById(id).exec();
    return fidelityNFT;
  }

  async getFidelityNFTByWalletAddressAndSeasonId(walletAddress: string, seasonId: string): Promise<IFidelityNFT | null> {
    const fidelityNFT = await this.fidelityNFTModel.findOne({ 
      walletAddress, 
      seasonId 
    }).exec();
    return fidelityNFT;
  }
}
