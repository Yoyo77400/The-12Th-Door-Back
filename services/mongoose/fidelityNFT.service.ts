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
    console.log("Creating fidelity NFT with data:", data);
    console.log("seasonId type:", typeof data.seasonId);
    console.log("Final fidelityLevel type:", typeof data.fidelityLevel, "value:", data.fidelityLevel);
    const fidelityNFT = await this.fidelityNFTModel.create(data);
    return fidelityNFT;
  }

  async getFidelityNFTById(id: string): Promise<IFidelityNFT | null> {
    const fidelityNFT = await this.fidelityNFTModel.findById(id).exec();
    return fidelityNFT;
  }
}
