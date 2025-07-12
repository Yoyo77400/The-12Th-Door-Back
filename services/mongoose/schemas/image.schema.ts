import { Schema } from 'mongoose';
import { IImage } from '../../../models/';

export const ImageSchema = new Schema<IImage>({
    fidelityNFTId: { type: Schema.Types.ObjectId, ref: 'fidelityNFTs', default: null },
    matchNFTId: { type: Schema.Types.ObjectId, ref: 'matchNFTs', default: null },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true }
}, {
    timestamps: true,   
    collection: 'images',
    versionKey: false
});