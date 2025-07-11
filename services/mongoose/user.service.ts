import { IUser } from "../../models";
import { UserSchema } from "./schemas/user.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateUser = Omit<IUser, "_id" | "createdAt" | "updatedAt" >;

export class UserService {
    readonly mongooseService: MongooseService;
    readonly userModel: Model<IUser>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    this.userModel = mongooseService.mongoose.model(Models.User, UserSchema);
  }

  async createUser(user: ICreateUser, publicKey : string): Promise<IUser> {
    const walletAddress = publicKey;
    user.walletAddress = publicKey;
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async getRootUser(): Promise<IUser | null> {
    const rootPublicKey = process.env.ROOT_PUBLIC_KEY;
    if (!rootPublicKey) {
      throw new Error("ROOT_PUBLIC_KEY environment variable is not set");
    }
    return this.userModel.findOne({ walletAddress: rootPublicKey }).exec();
  }

  async getUserByPublicKey(publicKey: string): Promise<IUser | null> {
    return this.userModel.findOne({ walletAddress: publicKey }).exec();
  }
  
}
