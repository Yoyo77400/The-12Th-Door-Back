import mongoose, { Document, Schema } from 'mongoose'
import { ITimestamp } from './TimeStamp.interface'

export interface IUser extends ITimestamp {
  _id: string;
  walletAddress: string;
  isAdmin: boolean;
}


