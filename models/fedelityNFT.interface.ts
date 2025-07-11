import { ITimestamp } from "./TimeStamp.interface";

export enum FidelityLevel {
    BRONZE = 1,
    SILVER = 2,
    GOLD = 3,
    PLATINUM = 4,
}
export interface IFedelityNFT extends ITimestamp {
    tokenId: string;
    walletAddress: string;
    isMinted: boolean;
    fidelityPoints: number;
    fidelityLevel: FidelityLevel;
    mediaUrl: string;
}