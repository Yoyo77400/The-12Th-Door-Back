import { Schema } from 'mongoose';
import { ISeason } from '../../../models';

export const SeasonSchema = new Schema<ISeason>({
  seasonNumber: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true }

}, {
    timestamps: true,
    collection: 'seasons',
    versionKey: false
});


