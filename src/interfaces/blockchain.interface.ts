export interface IBlockchain {
    chain: any;
    addBlock(arg: any): any;
    isValidChain(arg: any): boolean;
}