import express from 'express';
import controller from '../controllers/index';

const router = express.Router();

router.get('/check', controller.serverHealthCheck);
router.get('/blocks', controller.blocksStatus);
router.get('/transactions', controller.transactionsStatus);
router.get('/transaction/:transactionId', controller.getTransactionStatus);
router.get('/transactions/:publicKey', controller.getTransactionsByAddress);
router.get('/wallet', controller.getWallet);
router.get('/walletsPool', controller.getWalletsPool);
router.post('/transact', controller.createTransaction);
router.post('/newWallet', controller.createWallet);
router.post('/mine', controller.mineBlock);

export = router;