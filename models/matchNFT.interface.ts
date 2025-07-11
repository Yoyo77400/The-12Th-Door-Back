import { ITimestamp } from './TimeStamp.interface'

export interface IMatchNFT extends ITimestamp {
    tokenId: string;
    walletAddress: string;
    isMinted: boolean;
    matchId: string;
    mediaUrl: string;
}