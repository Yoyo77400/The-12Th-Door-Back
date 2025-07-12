import { Schema } from 'mongoose';
import { IFidelityNFT, FidelityLevel } from '../../../models';

export const FidelityNFTSchema = new Schema<IFidelityNFT>({
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


