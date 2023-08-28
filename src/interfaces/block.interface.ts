export interface IBlock {
    timestamp: string;
    transactions: Array<any>;
    previousHash: string;
    hash: string;
    nonce: number;
    validator: string;
    signature: string;
    toString(): string;
}