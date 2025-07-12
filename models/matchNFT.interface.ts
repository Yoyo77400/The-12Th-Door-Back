import { ITimestamp } from './TimeStamp.interface'

export enum NFTRarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
}
export interface IMatchNFT extends ITimestamp {
    _id: string;
    walletAddress: string;
    isMinted: boolean;
    matchId?: string;
    seasonId?: string;
    mediaUrl?: string;
    rarity?: NFTRarity;
}