var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('isFibonacci', function() {
    it('should exist', function(){
        should.exist(isFibonacci);
    });

    it('should be a function', function() {
        isFibonacci.should.be.a.Function;
    });

    it('should return a Boolean', function() {
        var result = isFibonacci(5);
        should.exist(result);
        result.should.be.an.instanceof(Boolean);
    });

    it('should return false if no input provided', function() {
        var result = isFibonacci();
        result.should.be.eql(false);
    });

    it('should return true if input is 1', function(){
        var result = isFibonacci(1);
        result.should.be.eql(true);
    });

    it('should have the right answer', function(){
        var result = isFibonacci(5);
        result.should.be.eql(true);
    });

    it('should have the right answer', function(){
        var result = isFibonacci(6);
        result.should.be.eql(false);
    });

    it('should handle large numbers', function() {
        var result = isFibonacci(233);
        result.should.be.eql(true);
    });

});
