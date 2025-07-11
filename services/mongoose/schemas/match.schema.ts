import { Schema } from 'mongoose';
import { IMatch, MatchStatus } from '../../../models';

export const MatchSchema = new Schema<IMatch>({
    _id: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    matchDate: { type: Date, required: true },
    score: {
        home: { type: Number, default: 0 },
        away: { type: Number, default: 0 }
    },
    status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.SCHEDULED },
    stadium: { type: String, required: true },
    referee: { type: String, required: true },
    seasonId: { type: String, required: true }

}, {
    timestamps: true,
    collection: 'matchs',
    versionKey: false
});


