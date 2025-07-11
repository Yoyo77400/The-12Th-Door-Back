import mongoose, { Document, Schema } from 'mongoose'
import { ITimestamp } from './TimeStamp.interface'

export interface IUser extends ITimestamp {
  walletAddress: string;
  isAdmin: boolean;
}


