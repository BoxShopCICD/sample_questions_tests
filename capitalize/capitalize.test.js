var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('capitalize', function() {
    it('should exist', function(){
        should.exist(capitalize);
    });

    it('should be a function', function() {
        capitalize.should.be.a.Function;
    });

    it('should return an string', function() {
        var result = capitalize('hello');
        should.exist(result);
        result.should.be.an.instanceof(String);
    });

    it('should return an empty string if no input provided', function() {
        var result = capitalize();
        result.should.be.eql('');
    });

    it('should capitalize a single character', function(){
        var result = capitalize('a');
        result.should.be.eql('A');
    });

    it('should capitalize the first letter of multiple worlds', function(){
        var result = capitalize('hello world');
        result.should.be.eql('Hello World');
    });

    it('should not change capitalization for any other character', function(){
        var result = capitalize('hELLO wORLD');
        result.should.be.eql('HELLO WORLD');
    });

});
