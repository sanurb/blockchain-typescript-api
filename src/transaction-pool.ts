import { ITransactionPool } from "./interfaces";

const Transaction = require('./transaction');

export class TransactionPool implements ITransactionPool {
    transactions: Array<any>;

    constructor(transactions: Array<any>) {
        this.transactions = [];
    }

    addTransaction(transaction: any) {
        const serializedTransaction = { id: transaction?.id, type: transaction?.type, input: transaction?.input, output: transaction?.output };
        this.transactions.push(serializedTransaction);
    }

    validTransactions() {
        return this.transactions.filter((transaction) => {
            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature from ${transaction.data.from}`);
                return;
            }

            return transaction;
        });
    }
}