import { Schema } from 'mongoose';
import { IMatchNFT } from '../../../models';

export const MatchNFTSchema = new Schema<IMatchNFT>({
    _id: { type: String, required: true },
    walletAddress: { type: String, required: true },
    isMinted: { type: Boolean, default: false },
    matchId: { type: Schema.Types.ObjectId, ref: 'matchs', required: true },
    mediaUrl: { type: String, required: true },

}, {
    timestamps: true,
    collection: 'matchNFTs',
    versionKey: false
});


