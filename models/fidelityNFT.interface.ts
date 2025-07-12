import { ITimestamp } from "./TimeStamp.interface";

export enum FidelityLevel {
    BRONZE = 1,
    SILVER = 2,
    GOLD = 3,
    PLATINUM = 4,
}
export interface IFidelityNFT extends ITimestamp {
    _id: string;
    walletAddress: string;
    isMinted: boolean;
    fidelityPoints: number;
    fidelityLevel: FidelityLevel;
    mediaUrl: string;
}