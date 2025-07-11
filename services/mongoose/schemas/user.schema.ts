import { Schema } from 'mongoose';
import { IUser } from '../../../models';

export const UserSchema = new Schema<IUser>({
  walletAddress: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },

}, {
    timestamps: true,
    collection: 'users',
    versionKey: false
});


