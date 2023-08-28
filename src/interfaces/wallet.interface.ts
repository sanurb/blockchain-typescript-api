export interface IWallet {
    balance: number;
    keyPair: any;
    publicKey: string;
    secret: any;
    toString(): string;
    sign(arg: any): any;
    createTransaction(to: string, amount: number, type: any, blockchain: any, transactionPool: any): any;
}