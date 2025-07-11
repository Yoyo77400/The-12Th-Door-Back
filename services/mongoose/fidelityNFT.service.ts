import { IFedelityNFT } from "../../models";
import { FidelityNFTSchema } from "./schemas/fidelityNFT.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateFidelityNFT = Omit<IFedelityNFT, "_id">;

export class FidelityNFTService {
    readonly mongooseService: MongooseService;
    readonly fidelityNFTModel: Model<IFedelityNFT>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.fidelityNFTModel = mongooseService.mongoose.model(Models.FidelityNFT, FidelityNFTSchema);
  }
}
