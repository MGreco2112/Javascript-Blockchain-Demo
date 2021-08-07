const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock() {
        return new Block(0, "01/01/2112", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let galtCoin = new Blockchain();
galtCoin.addBlock(new Block(1, "01/02/2112", {amount: 4}));
galtCoin.addBlock(new Block(2, "01/05/2112", {amount: 10}));
galtCoin.addBlock(new Block(3, "01/09/2112", {amount: 50}));

console.log(JSON.stringify(galtCoin, null, 4));

console.log("Is blockchain valid? " + galtCoin.isChainValid());

galtCoin.chain[1].data = {amount: 100};
galtCoin.chain[1].hash = galtCoin.chain[1].calculateHash();

console.log(JSON.stringify(galtCoin, null, 4));

console.log("Is blockchain valid? " + galtCoin.isChainValid());