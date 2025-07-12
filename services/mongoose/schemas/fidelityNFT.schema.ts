import { Schema } from 'mongoose';
import { IFidelityNFT, FidelityLevel } from '../../../models';

export const FidelityNFTSchema = new Schema<IFidelityNFT>({
    walletAddress: { type: String, required: true },
    seasonId: { type: Schema.Types.ObjectId, ref: 'seasons', required: true },
    isMinted: { type: Boolean, default: false },
    fidelityPoints: { type: Number, default: 0 },
    fidelityLevel: { type: Number, enum: [FidelityLevel.BRONZE, FidelityLevel.SILVER, FidelityLevel.GOLD, FidelityLevel.PLATINUM], default: FidelityLevel.BRONZE },
    matchNFTMinted: { type: Number, default: 0 },
    mediaUrl: { type: String, required: true },

}, {
    timestamps: true,
    collection: 'fidelityNFTs',
    versionKey: false
});


