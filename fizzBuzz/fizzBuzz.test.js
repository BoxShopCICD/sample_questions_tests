var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('fizzBuzz', function() {
    it('should exist', function(){
        should.exist(fizzBuzz);
    });

    it('should be a function', function() {
        fizzBuzz.should.be.a.Function;
    });

    it('should return an Array', function() {
        var result = fizzBuzz(5);
        should.exist(result);
        result.should.be.an.instanceof(Array);
    });

    it('should return an empty array if no input provided', function() {
        var result = fizzBuzz();
        result.should.be.eql([]);
    });

    it('should return an array with a single value if input is 1', function(){
        var result = fizzBuzz(1);
        result.should.be.eql([1]);
    });

    it('should have the right number of entries in the Array', function(){
        var result = fizzBuzz(5);
        var len = result.length;
        len.should.be.eql(5);
    });

    it('should have the right values', function() {
        var expected = [1,2,'fizz',4,'buzz','fizz',7,8,'fizz','buzz',11,'fizz',13,14,'fizzbuzz'];
        var result = fizzBuzz(15);
        result.should.be.eql(expected);
    });

    it('should not have any special values if input is 2', function() {
        var expected = [1,2];
        var result = fizzBuzz(2);
        result.should.be.eql(expected);
    });

});
