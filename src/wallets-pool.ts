import { IWalletsPool } from "./interfaces";

const Wallet = require('./wallet');

export class WalletsPool implements IWalletsPool {
    wallets: Array<any>;

    constructor(wallets: Array<any>) {
        this.wallets = [];
    }

    addWallet(wallet: any) {
        const serializedWallet = { publicKey: wallet?.publicKey, privateKey: wallet?.privateKey, balance: wallet?.balance, secret: wallet?.secret };
        this.wallets.push(serializedWallet);
    }

    getWalletByPrivateKey(privateKey: string) {
        return this.wallets.find((wallet) => wallet.privateKey === privateKey);
    }

    getWalletByPublicKey(publicKey: string) {
        return this.wallets.find((wallet) => wallet.publicKey === publicKey);
    }

    updateWalletBalance(publicKey: string, newBalance: number) {
        const wallet = this.getWalletByPublicKey(publicKey);
        if (wallet) {
            wallet.balance = newBalance;
        }
    }
}