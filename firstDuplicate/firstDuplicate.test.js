var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('firstDuplicate', function() {
    it('should exist', function(){
        should.exist(firstDuplicate);
    });

    it('should be a function', function() {
        firstDuplicate.should.be.a.Function;
    });

    it('should return a String', function() {
        var result = firstDuplicate('aa');
        should.exist(result);
        result.should.be.an.instanceof(String);
    });

    it('should return an empty string if no input provided', function() {
        var result = firstDuplicate();
        result.should.be.eql('');
    });

    it('should return an empty string if only one character inputted', function(){
        var result = firstDuplicate('a');
        result.should.be.eql('');
    });

    it('should have the right answer', function(){
        var result = firstDuplicate('abcdefabcdef');
        result.should.be.eql('a');
    });

    it('should handle upper and lower case letters', function(){
        var result = firstDuplicate('ABCDEFabcdef');
        result.should.be.eql('a');
    });

    it('should handle long strings', function() {
        var result = firstDuplicate('abcdefghijklmnopqrstuvwxyza');
        result.should.be.eql('a');
    });

});
