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

var obj3 = { city: 'Chennai', dist: 'Chennai'};
var obj3_result = [{ city: 'Chennai', dist: 'Chennai', _index: 'chennai'}];

var obj4 = { city: 'Chennai', state: 'NA'};
var obj4_result = [{ city: 'Chennai', state: 'NA', _index: 'chennaina'}];
var obj4_result_skip = [{ city: 'Chennai', state: 'NA', _index: 'chennai'}];

var obj5 = { city: 'Chennai', state: { name: 'Tamil Nadu'}};
var obj5_result = [{city: 'Chennai', state: { name: 'Tamil Nadu'}, _index: 'chennai'}];

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

	it('should index only the available keys', function() {
		var result = ij.index(obj3, keys);
		expect(result).to.deep.equal(obj3_result);
	});

	it('should index only the available keys even if skipValue is given', function() {
		var result = ij.index(obj3, keys, 'na');
		expect(result).to.deep.equal(obj3_result);
	});

	it('should throw "skipValue should be a string" error', function() {
		expect(ij.index.bind(null, obj4, keys, 1)).to.throw(Error, 'skipValue should be a string');
	});

	it('should not include skipValue in index', function() {
		var result = ij.index(obj4, keys, 'NA');
		expect(result).to.deep.equal(obj4_result_skip);
	});

	it('should index even if skipValue is not given', function() {
		var result = ij.index(obj4, keys);
		expect(result).to.deep.equal(obj4_result);
	});

	it('should index if skipValue is not equal to any value', function() {
		var result = ij.index(obj4, keys, 'lol');
		expect(result).to.deep.equal(obj4_result);
	});

	it('should skip indexing object values', function() {
		var result = ij.index(obj5, keys);
		expect(result).to.deep.equal(obj5_result);
	})
});