import { IImage } from "../../models";
import { ImageSchema } from "./schemas/image.schema";
import { Model } from "mongoose";
import { MongooseService } from "./mongoose.service";
import { Models } from "./mongoose.models";

export type ICreateImage = Omit<IImage, "_id">;

export class ImageService {
    readonly mongooseService: MongooseService;
    readonly imageModel: Model<IImage>;
    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        this.imageModel = mongooseService.mongoose.model<IImage>(Models.Image, ImageSchema);
    }
    async uploadImage(file: Express.Multer.File, nftRef: { fidelityNFTId?: string; matchNFTId?: string }): Promise<IImage> {
        const { fidelityNFTId, matchNFTId } = nftRef;

  if ((fidelityNFTId && matchNFTId) || (!fidelityNFTId && !matchNFTId)) {
    throw new Error("Exactly one of fidelityNFTId or matchNFTId must be provided");
  }

  const image = await this.imageModel.create({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
        fidelityNFTId: fidelityNFTId ? new this.mongooseService.mongoose.Types.ObjectId(fidelityNFTId) : null,
        matchNFTId: matchNFTId ? new this.mongooseService.mongoose.Types.ObjectId(matchNFTId) : null,
    });
        return image;
    }
    
    async getImageById(id: string): Promise<IImage | null> {
        const image = await this.imageModel.findById(id).exec();
        return image;
    }
}