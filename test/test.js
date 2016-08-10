'use strict';

var expect = require('chai').expect;
var ij = require('../index');

var obj1 = { city: 'Chennai', state: 'Tamil Nadu'};
var obj1_result = [{ city: 'Chennai', state: 'Tamil Nadu', _index: 'chennaitamilnadu'}];
var obj2 = [
	{city: 'Chennai', state: 'Tamil Nadu'},
	{city: 'Mumbai', state: 'Maharashtra'}
];
var obj2_result = [
	{city: 'Chennai', state: 'Tamil Nadu', _index: 'chennaitamilnadu'},
	{city: 'Mumbai', state: 'Maharashtra', _index: 'mumbaimaharashtra'}
];
var keys = ['city', 'state'];

describe('Index JSON', function() {
	it('should throw "Invalid obj or keys" error', function() {
		expect(ij.index.bind(null, null, null)).to.throw(Error, 'Invalid obj or keys');
	});

	it('should throw "obj is not a proper JSON" error', function() {
		expect(ij.index.bind(null, 'dummy', ['a'])).to.throw(Error, 'obj is not a proper JSON');
	});

	it('should throw "keys should be an array" error', function() {
		expect(ij.index.bind(null, obj1, 'city')).to.throw(Error, 'keys should be an array');
	});

	it('should add _index to object and return array', function() {
		var result = ij.index(obj1, keys);
		expect(result).to.deep.equal(obj1_result);
	});

	it('should add _index to all objects in array and return array', function() {
		var result = ij.index(obj2, keys);
		expect(result).to.deep.equal(obj2_result);
	});

	it('should not alter the source object after indexing', function() {
		var temp1 = { city: 'Chennai', state: 'Tamil Nadu'};
		var temp2 = JSON.parse(JSON.stringify(temp1));
		var result = ij.index(temp1, keys);
		expect(temp1).to.deep.equal(temp2);
	});
});