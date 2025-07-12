export interface IImage {
    _id?: string;
    fidelityNFTId?: string;
    matchNFTId?: string;
    filename: string;
    contentType: string;
    data: Buffer;
}