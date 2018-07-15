const Blockchain = require('./index');
const Block = require('./block');
//const P2pServer = require('./p2p-server');

describe('Blockchain', () => {
    let bc, bc2;
    
    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })
    
    /*
    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    })
    */
    it('adds new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    })
   
    it('validates a valid chain', () => {
        bc2.addBlock('foo');
        
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    })
    /*
    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0] = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })
    
    it('replaces chain with valid chain', () => {
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);
        
        expect(bc.chain).toEqual(bc2.chain);
    })
    
    it('it does not replace chain with shorter chain', () => {
        bc.addBlock("loo");
        bc.replaceChain(bc2.chain);
        
        expect(bc.chain).not.toEqual(bc2.chain);
    })
    */
})