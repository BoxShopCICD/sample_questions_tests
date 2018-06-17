let should = require('should');
let vm = require('vm');
let fs = require('fs');
let filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('letterCount', function() {
    it('should exist', function(){
        should.exist(filename);
    });

    it('should be a function', function() {
        filename.should.be.a.Function;
    });

});
