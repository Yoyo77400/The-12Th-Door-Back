import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  walletAddress: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  walletAddress: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IUser>('User', UserSchema)
