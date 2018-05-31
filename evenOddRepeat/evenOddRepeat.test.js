var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('evenOddRepeat', function() {
    it('should exist', function(){
        should.exist(evenOddRepeat);
    });

    it('should be a function', function() {
        evenOddRepeat.should.be.a.Function;
    });

    it('should return a String', function() {
        var result = evenOddRepeat('123');
        should.exist(result);
        result.should.be.an.instanceof(String);
    });

    it('should return an empty string if no input provided', function() {
        var result = evenOddRepeat();
        result.should.be.eql('');
    });

    it('should return a single character if only one number inputted', function(){
        var result = evenOddRepeat('1');
        result.should.be.eql('1');
    });

    it('should have the right answer', function(){
        var result = evenOddRepeat('12333224');
        result.should.be.eql('123x3x32y2y4');
    });

    it('should handle long numbers with no repeats', function() {
        var result = evenOddRepeat('123456789');
        result.should.be.eql('123456789');
    });

    it('should handle repeating numbers', function() {
        var result = evenOddRepeat('1111222');
        result.should.be.eql('1x1x1x12y2y2');
    });

});
