const SHA256 = require('crypto-js/sha256');

const {DIFFICULTY, MINE_RATE} = require('../config');

class Block {
    //a block is composed of 
    //a timestamp from the time of creation
    //data that it is storing
    //a hash of the concatenation of its timestamp, lastHash and data
    //a reference to the hash of the block topologically prior to it

    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }
    
    //toString to display block data
    toString(){
        return ` Block - 
            Timestamp: ${this.timestamp}
            lastHash: ${this.lastHash}
            hash: ${this.nonce}
            nonce: ${this.hash}
            difficulty: ${this.difficulty}
            data: ${this.data}`;
    }
    
    //function to create the Genesis block,
    //which is the first block in the chain
    //timestamp = 0 
    //lastHash = null
    //hash = 'f1r57-h45h', which is an arbitrary string
    //data = [] i.e. empty data
    static genesis(){
        return new this(0,null,'f1r57-h45h', [], 0, DIFFICULTY);     
    }
    
    //creates new block as function of the block prior to it
    static mineBlock(lastBlock, data){
       let hash, timestamp;
       let nonce = 0;
       let {difficulty} = lastBlock;
       const lastHash = lastBlock.hash;
       
       do {
          nonce++;
          timestamp = Date.now();
          difficulty = Block.adjustDifficulty(lastBlock, timestamp);
          hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);         
       }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
       
       return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }
    
    //hashes the concatenation of its timestamp, lastHash and data using SHA256
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }
    
    //wrapper method to hash a block 
    static blockHash(block){
        const {timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp,lastHash,data, nonce, difficulty);
    }
    
    static adjustDifficulty(lastBlock, currentTime){
        let {difficulty} = lastBlock; 
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;