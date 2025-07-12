import { IMatchNFT } from "../../models";
import { MatchNFTSchema } from "./schemas/matchNFT.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateMatchNFT = Omit<IMatchNFT, "_id">;

export class MatchNFTService {
    readonly mongooseService: MongooseService;
    readonly matchNFTModel: Model<IMatchNFT>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.matchNFTModel = mongooseService.mongoose.model(Models.MatchNFT, MatchNFTSchema);
  }

  async createMatchNFT(data: ICreateMatchNFT): Promise<IMatchNFT> {
    console.log("Creating match NFT with data:", data);
    const matchNFT = await this.matchNFTModel.create(data);
    return matchNFT;
  }
}
