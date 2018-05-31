var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('sumNumbers', function() {
    it('should exist', function(){
        should.exist(sumNumbers);
    });

    it('should be a function', function() {
        sumNumbers.should.be.a.Function;
    });

    it('should return a Number', function() {
        var result = sumNumbers(5);
        should.exist(result);
        result.should.be.an.instanceof(Number);
    });

    it('should return zero if no input provided', function() {
        var result = sumNumbers();
        result.should.be.eql(0);
    });

    it('should return one if input is 1', function(){
        var result = sumNumbers(1);
        result.should.be.eql(1);
    });

    it('should have the right answer', function(){
        var result = sumNumbers(5);
        result.should.be.eql(15);
    });

    it('should handle large numbers', function() {
        var result = sumNumbers(15);
        result.should.be.eql(120);
    });

});
