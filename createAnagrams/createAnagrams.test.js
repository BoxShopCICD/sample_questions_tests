var should = require('should');
var vm = require('vm');
var fs = require('fs');
var filename = __filename.replace(/\.test\.js$/, '.js');
vm.runInThisContext(fs.readFileSync(filename), filename);


describe('createAnagrams', function() {
  it('should exist', function(){
    should.exist(createAnagrams);
  });

  it('should be a function', function() {
    createAnagrams.should.be.a.Function;
  });

  it('should return an array', function() {
    var result = createAnagrams('hello');
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with a single character', function(){
    var result = createAnagrams('a');
    result.should.be.eql(['a']);
  });

  it('should return an array of anagrams that contains `nat` for input `ant`', function(){
    var result = createAnagrams('ant');
    var found = result.indexOf('nat') !== -1;
    found.should.be.true;
  });

  it('should return a single entry in array if input is same characters', function() {
    var expected = ['aaa'];
    var result = createAnagrams('aaa');
    result.length.should.be.equal(expected.length);
  });

  it('should return all anagrams for \'ab\'', function(){
    var expected = ['ab', 'ba'];
    var result = createAnagrams('ab');
    var item, found = false;
    for(var i = 0; i < expected.length; i++){
      item = expected[i];
      found = result.indexOf(item) !== -1;
      found.should.be.true;
    }
  });

  it('should return all anagrams for \'jtb\'', function(){
    var expected = ['jtb', 'jbt', 'tjb', 'tbj', 'bjt', 'btj'];
    var result = createAnagrams('jtb');
    var item, found = false;
    for(var i = 0; i < expected.length; i++){
      item = expected[i];
      found = result.indexOf(item) !== -1;
      found.should.be.true;
    }
  });

  it('should return only unique anagrams for \'apps\'', function() {
    var expected = [ 'apps', 'apsp', 'aspp', 'paps', 'pasp', 'ppas', 'ppsa'
      , 'psap', 'pspa', 'sapp', 'spap', 'sppa' ];
    var match = true;
    var result = createAnagrams('apps');
    result.length.should.be.equal(expected.length);
  });

});
