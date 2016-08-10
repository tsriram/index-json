'use strict';

/**
*	Indexes a JSON object with selected fields - 
* creates _index property in each object by concatenating selected properties
*	@param {Array of objects or object} obj
* @param {Array of strings} keys
* @return {Array of objects with _index property added}
*/

function indexJSON(obj, keys) {
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

	if(!Array.isArray(obj)) {
		cloneObj = [JSON.parse(JSON.stringify(obj))];
	}else {
		cloneObj = JSON.parse(JSON.stringify(obj));
	}

	cloneObj.forEach(function(o) {
		var index = "";
		keys.forEach(function(k) {
			if(o[k] && typeof o[k] !== 'object')
				index += o[k].toString().toLowerCase().replace(/ /g, '');
		});
		o['_index'] = index;
	});

	return cloneObj;
}

exports.index = indexJSON;