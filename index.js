'use strict';

/**
*	Indexes a JSON object with selected fields - 
* creates _index property in each object by concatenating selected properties
*	@param {Array of objects or object} obj
* @param {Array of strings} keys
* @param {string} skipValue - to skip a value from being added to index
* @return {Array of objects with _index property added}
*/

function indexJSON(obj, keys, skipValue) {
	var cloneObj = [];

	if(!(obj && keys)) {
		throw new Error('Invalid obj or keys');
	}

	if(!(typeof obj === 'object' || Array.isArray(obj))) {
		throw new Error('obj is not a proper JSON');
	}

	if(!Array.isArray(keys)) {
		throw new Error('keys should be an array');
	}

	if(skipValue) {
		if(typeof skipValue !== 'string') {
			throw new Error('skipValue should be a string');
		}
	}

	if(!Array.isArray(obj)) {
		cloneObj = [JSON.parse(JSON.stringify(obj))];
	}else {
		cloneObj = JSON.parse(JSON.stringify(obj));
	}

	cloneObj.forEach(function(o) {
		var index = "";
		if(skipValue) {
			skipValue = skipValue.toLowerCase().replace(/ /g, '');
			keys.forEach(function(k) {
				if(o[k] && typeof o[k] !== 'object') {
					var val = o[k].toString().toLowerCase().replace(/ /, '');
					if(val !== skipValue) {
						index += val;
					}
				}
			});
		}else {
			keys.forEach(function(k) {
				if(o[k] && typeof o[k] !== 'object'){
					var val = o[k].toString().toLowerCase().replace(/ /, '');
					index += val;
				}
			});
		}
		o['_index'] = index;
	});

	return cloneObj;
}

exports.index = indexJSON;