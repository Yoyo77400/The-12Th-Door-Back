import { ITimestamp } from './TimeStamp.interface'

export interface IMatchNFT extends ITimestamp {
    _id: string;
    walletAddress: string;
    isMinted: boolean;
    matchId?: string;
    mediaUrl: string;
}