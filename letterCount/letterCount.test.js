let should = require('should');
let vm = require('vm');
let fs = require('fs');
let letterCount = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('letterCount', function() {
    it('should exist', function(){
        should.exist(letterCount);
    });

    it('should be a function', function() {
        letterCount.should.be.a.Function;
    });

});
