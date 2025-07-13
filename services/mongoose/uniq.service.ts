import { IUniq } from "../../models";
import { UniqSchema } from "./schemas/uniq.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateUniq = IUniq;

export class UniqService {
  readonly mongooseService: MongooseService;
  readonly uniqModel: Model<IUniq>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.uniqModel = mongooseService.mongoose.model<IUniq>(
      Models.Uniq,
      UniqSchema
    );
  }

  async createUniq(uniq: ICreateUniq): Promise<IUniq> {
    console.log("Creating uniq with data:", uniq);
    const newUniquniq = this.uniqModel.create(uniq);
    return newUniquniq;
  }

  async getUniqByCodeId(code_id: string): Promise<IUniq | null> {
    const uniq = await this.uniqModel.findOne({ code_id });
    return uniq;
  }
}
