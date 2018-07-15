const Block = require('./blockchain/block');

const Blockchain = require('./blockchain/index');

//Init block test
//const block = new Block('1', '2', '3', '4');

//test toString method
//console.log(block.toString());

//test genesis block method
//console.log(Block.genesis().toString());


const bc = new Blockchain();
for(let i=0;i<10;i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
}