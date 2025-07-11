import { ISeason } from "../../models";
import { SeasonSchema } from "./schemas/season.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateSeason = Omit<ISeason, "_id">;

export class SeasonService {
    readonly mongooseService: MongooseService;
    readonly seasonModel: Model<ISeason>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.seasonModel = mongooseService.mongoose.model(Models.Season, SeasonSchema);
  }
}
