import { IMatch } from "../../models";
import { MatchSchema } from "./schemas/match.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateMatch = Omit<IMatch, "_id">;

export class MatchService {
    readonly mongooseService: MongooseService;
    readonly matchModel: Model<IMatch>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.matchModel = mongooseService.mongoose.model(Models.Match, MatchSchema);
  }

  async createMatch(data: ICreateMatch): Promise<IMatch> {
    console.log("Creating match with data:", data);
    const match = await this.matchModel.create(data);
    return match;
  }

  async getById(id: string): Promise<IMatch | null> {
    const match = await this.matchModel.findById(id
    ).exec();
    if (!match) {
      return null;
    }
    return match;
  }
}
