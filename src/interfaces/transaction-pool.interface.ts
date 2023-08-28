export interface ITransactionPool {
    transactions: Array<any>;
    addTransaction(arg: any): any;
    validTransactions(arg: any): any;
}
