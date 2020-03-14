const expect = require('expect')

//import isRealString
const {isRealString} =require('./validation');

//isRealString
//should reject non-string values

//should reject string with only spaces

//should allow string with non-space character


describe('isRealString',()=>{
    it('should rerject non-string values', ()=>{
        var res = isRealString(98);
        expect(res).toBe(false) 
    })

    it('should reject string with only spaces', ()=>{
        var res = isRealString('    ');
        expect(res).toBe(false) 
    })

    it('should allow string with non-space character', ()=>{
        var res = isRealString(' Akash  ');
        expect(res).toBe(true) 
    })
})