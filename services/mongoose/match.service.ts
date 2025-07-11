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
}
