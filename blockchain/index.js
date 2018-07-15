const Block = require('./block');

class Blockchain{
    
    //initially, a chain consists of just the genesis block
    constructor() {
        this.chain = [Block.genesis()];
    }
    
    //a block is added by mining a block and then pushin it to the chain 
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);
        
        return block;
    }
    
    //validates a chain
    isValidChain(chain){
        // a chain is invalid if the fisrt block is not equal to the genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) 
            return false;
        
        for (let i=1; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            
            //a chain is not valid if the current blocks hash does not equal hash of last block
            if(block.lastHash !== lastBlock.hash
            || block.hash !== Block.blockHash(block))
                return false;
        }
        
        return true;
    }
    
    //replaces a nodes chain with a longer chain assuming it is valid
    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Chain is not long enough");
            return;
        }
        
        if(!this.isValidChain(newChain)){
            console.log("Chain is not valid");
            return;
        }
        
        this.chain = newChain;
        console.log("New chain has replaced old chain.");
    }
}

module.exports = Blockchain;