import { ITransactionPool } from "./interfaces";

const Transaction = require("./transaction");

export class TransactionPool implements ITransactionPool {
	transactions: Array<any>;

	constructor(transactions: Array<any>) {
		this.transactions = [];
	}

	addTransaction(transaction: any) {
		const existingTransaction = this.transactions.find(
			(t) => t.id === transaction.id
		);

		if (existingTransaction) {
			return;
		}

		const serializedTransaction = {
			id: transaction?.id,
			type: transaction?.type,
			input: transaction?.input,
			output: transaction?.output,
		};

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

	getTransactionById(transactionId: string) {
		return this.transactions.find(
			(transaction) => transaction.id === transactionId
		);
	}

	getTransactionsByAddress(address: string) {
		return this.transactions.filter(
			(transaction) =>
				transaction.input?.from === address ||
				transaction.output?.to === address
		);
	}

	public hasTransaction(
		publicKey: string,
		to: string,
		amount: number,
		type: string
	): boolean {
		return this.transactions.some(
			(tx) =>
				tx.input.address === publicKey &&
				tx.output[to] === amount &&
				tx.type === type
		);
	}
}
