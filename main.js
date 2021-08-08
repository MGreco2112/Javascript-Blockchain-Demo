const {Blockchain , Transaction} = require('./blockchainDemo');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('5f3fdf1f7e4e471a0f0f9d07e572a318661bc568fe0c173a72dd505f11665c37');
const myWalletAddress = myKey.getPublic('hex');


let galtCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
galtCoin.addTransaction(tx1);

console.log('\n Starting a miner...');
galtCoin.minePendingTransactions(myWalletAddress);

console.log("\nBalance of Galt is", galtCoin.getBalanceOfAddress(myWalletAddress));

// galtCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid?", galtCoin.isChainValid());
// console.log(JSON.stringify(galtCoin, null, 4));
