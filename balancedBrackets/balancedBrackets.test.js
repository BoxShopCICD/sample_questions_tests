var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('balancedBrackets', function() {
    it('should exist', function(){
        should.exist(balancedBrackets);
    });

    it('should be a function', function() {
        balancedBrackets.should.be.a.Function;
    });

    it('should return a boolean', function() {
        var result = balancedBrackets('hello');
        should.exist(result);
        result.should.be.an.instanceof(Boolean);
    });

    it('should return false if no input provided', function() {
        var result = balancedBrackets();
        result.should.be.eql(false);
    });

    it('should return false for a single bracket', function(){
        var result = balancedBrackets('(');
        result.should.be.eql(false);
    });

    it('should ignore non bracket characters', function(){
        var result = balancedBrackets('helloWorld()');
        result.should.be.eql(true);
    });

    it('should not allow nested brackets', function() {
        var result = balancedBrackets('{(})');
        result.should.be.eql(false);
    });

    it('should handle a large number of brackets', function(){
        var result = balancedBrackets('(((((((((({{{{{}}}}}))))))))))');
        result.should.be.eql(true);
    });

});
