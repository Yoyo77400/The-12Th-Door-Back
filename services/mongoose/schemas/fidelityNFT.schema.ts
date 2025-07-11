import { Schema } from 'mongoose';
import { IFedelityNFT, FidelityLevel } from '../../../models';

export const FidelityNFTSchema = new Schema<IFedelityNFT>({
    _id: { type: String, required: true },
    walletAddress: { type: String, required: true },
    isMinted: { type: Boolean, default: false },
    fidelityPoints: { type: Number, default: 0 },
    fidelityLevel: { type: Number, enum: Object.values(FidelityLevel), default: FidelityLevel.BRONZE },
    mediaUrl: { type: String, required: true },

}, {
    timestamps: true,
    collection: 'fidelityNFTs',
    versionKey: false
});


