var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);

describe('Factorial', function() {
    it('should exist', function(){
        should.exist(factorial);
    });

    it('should be a function', function() {
        factorial.should.be.a.Function;
    });

    it('should return a number', function() {
        var result = factorial(4);
        should.exist(result);
        result.should.be.an.instanceof(Number);
    });

    it('should return 1 for factorial of 1', function(){
        var result = factorial(1);
        result.should.be.eql(1);
    });

    it('should return 6 for factorial of 3', function(){
        var result = factorial(3);
        result.should.be.eql(6);
    });

    it('should return 362880 for factorial of 9', function(){
        var result = factorial(9);
        result.should.be.eql(362880);
    });

});
