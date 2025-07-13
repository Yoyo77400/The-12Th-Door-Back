import { Mongoose, connect } from "mongoose";
import {
  UserService,
  SeasonService,
  MatchService,
  MatchNFTService,
  FidelityNFTService,
  ImageService,
  UniqService,
} from "./index";

export class MongooseService {
  private static instance?: MongooseService;
  public mongoose: Mongoose;
  public userService: UserService;
  public seasonService: SeasonService;
  public matchService: MatchService;
  public matchNFTService: MatchNFTService;
  public fidelityNFTService: FidelityNFTService;
  public imageService: ImageService;
  public uniqService: UniqService;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.userService = new UserService(this);
    this.seasonService = new SeasonService(this);
    this.matchService = new MatchService(this);
    this.matchNFTService = new MatchNFTService(this);
    this.fidelityNFTService = new FidelityNFTService(this);
    this.imageService = new ImageService(this);
    this.uniqService = new UniqService(this);
  }

  public static async getInstance(): Promise<MongooseService> {
    if (!MongooseService.instance) {
      const connection = await MongooseService.openConnection();
      MongooseService.instance = new MongooseService(connection);
    }
    return MongooseService.instance;
  }

  private static openConnection(): Promise<Mongoose> {
    return connect(process.env.MONGO_URI! as string, {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      authSource: "admin",
      dbName: process.env.MONGO_DB as string,
    });
  }
}
