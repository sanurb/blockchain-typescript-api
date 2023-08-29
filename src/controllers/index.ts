import { NextFunction, Request, Response } from "express";
import { Blockchain } from "../blockchain";
import { TransactionPool } from "../transaction-pool";
import { Wallet } from "../wallet";
import { WalletsPool } from "../wallets-pool";
const { TRANSACTION_FEE } = require('../config');


const blockchain = new Blockchain();
const transactionPool = new TransactionPool([]);
const walletsPool = new WalletsPool([]);

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({
		message: "server running ok",
	});
};

const blocksStatus = (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json(blockchain.chain);
};

const getWallet = (req: Request, res: Response, next: NextFunction) => {
	const wallet = walletsPool?.wallets[0]; // to remove
	return res.status(200).json({
		publicKey: wallet.publicKey,
		privateKey: wallet.privateKey,
		balance: wallet.balance,
	});
};

const getWalletByPrivateKey = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { privateKey } = req.params;

	const wallet = walletsPool.getWalletByPrivateKey(privateKey);
	return res.status(200).json(wallet);
};

const getWalletByPublicKey = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { publicKey } = req.params;

	const wallet = walletsPool.getWalletByPublicKey(publicKey);
	return res.status(200).json(wallet);
};

const getWalletsPool = (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json(walletsPool?.wallets);
};

const createWallet = (req: Request, res: Response, next: NextFunction) => {
	const wallet = new Wallet(Date.now().toString());
	const serializedWallet = {
		publicKey: wallet?.publicKey,
		privateKey: wallet?.privateKey,
		balance: wallet?.balance,
		secret: wallet?.secret,
	};
	walletsPool.addWallet(serializedWallet);
	console.log(`New wallet added`, serializedWallet);
	return res.status(200).json(serializedWallet);
};

const transactionsStatus = (req: Request, res: Response, next: NextFunction) => {
    if (transactionPool?.transactions) {
        const filteredTransactions = transactionPool.transactions.map((transaction) => {
            return {
                id: transaction.id,
                type: transaction.type,
                output: {
                    to: transaction.output?.to,
                    amount: transaction.output?.amount,
                    fee: transaction.output?.fee,
                },
            };
        });

        return res.status(200).json(filteredTransactions);
    }
    return res.status(404).json({ message: "No transactions found" });
};

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, amount, type, publicKey } = req.body;

		const transactionAmount = amount - TRANSACTION_FEE;

        const senderWalletData = walletsPool.getWalletByPublicKey(publicKey);

        if (!senderWalletData) {
            return res.status(400).json({ message: "Billetera no encontrada" });
        }

        const senderWallet = new Wallet(senderWalletData.secret);

        const receiverWalletData = walletsPool.getWalletByPublicKey(to);

        if (!receiverWalletData) {
            return res.status(400).json({ message: "Billetera del receptor no encontrada" });
        }

        const transaction = senderWallet.createTransaction(
            to,
            amount,
            type,
            blockchain,
            transactionPool
        );

        if (transaction) {
            transactionPool.addTransaction(transaction);
            walletsPool.updateWalletBalance(publicKey, senderWallet.balance - amount);
            walletsPool.updateWalletBalance(to, receiverWalletData.balance + transactionAmount);
            const block = blockchain.addBlock(transaction);

            return res.status(200).json({ block, transaction: transaction.output });
        }

        return res.status(500).json({ message: "Error al crear la transacción" });
    } catch (err) {
        return res.status(500).json({ message: "Error al crear la transacción", error: err });
    }
};


const getTransactionStatus = (req: Request, res: Response, next: NextFunction) => {
	const { transactionId } = req.params;
	const transaction = transactionPool.getTransactionById(transactionId);

	if (!transaction) {
		return res.status(404).json({ message: "Transacción no encontrada" });
	}
	
	const safeTransaction = safeStringify(transaction);
	return res.status(200).json(JSON.parse(safeTransaction));
};

const getTransactionsByAddress = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { publicKey } = req.params;
	const transactions = transactionPool.getTransactionsByAddress(publicKey);

	if (!transactions.length) {
		return res
			.status(404)
			.json({ message: "Transacciones no encontradas" });
	}

	return res.status(200).json(transactions);
};

const mineBlock = (req: Request, res: Response, next: NextFunction) => {
	const block = blockchain.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	return res.status(200).json({ data: block });
};

function safeStringify(obj: any, indent = 2) {
    let cache: any = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) =>
            typeof value === "object" && value !== null
                ? cache.includes(value)
                    ? undefined // Elimina la referencia circular
                    : cache.push(value) && value
                : value,
        indent
    );
    cache = null;
    return retVal;
}

export default {
	createWallet,
	serverHealthCheck,
	getWallet,
	blocksStatus,
	transactionsStatus,
	createTransaction,
	mineBlock,
	getWalletsPool,
	getWalletByPrivateKey,
	getTransactionStatus,
	getTransactionsByAddress,
};
