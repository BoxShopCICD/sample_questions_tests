let should = require('should');
let vm = require('vm');
let fs = require('fs');
let palindrome = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('palindrome', function() {
    it('should exist', function(){
        should.exist(palindrome);
    });

    it('should be a function', function() {
        palindrome.should.be.a.Function;
    });

    it('should return a boolean', function() {
        let result = palindrome('hello');
        should.exist(result);
        result.should.be.an.instanceof(Boolean);
    });

    it('should return false if no input provided', function() {
        let result = palindrome();
        result.should.be.eql(false);
    });

    it('should return true for a single character', function(){
        let result = palindrome('a');
        result.should.be.eql(true);
    });

    it('should remove spaces and punctuation to create palindrome', function(){
        let result = palindrome('able was I! ere I saw elba');
        result.should.be.eql(true);
    });

    it('should work with input string of numbers', function() {
        let result = palindrome('707');
        result.should.be.eql(true);
    });

    it('should not let case of characters impact creation of palindrome', function(){
        let result = palindrome('RaceCAr');
        result.should.be.eql(true);
    });

});
