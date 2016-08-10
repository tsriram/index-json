# index-json

Many times you have a JSON on which you have to do a simple string search and you have to look up all those keys for which search / filter needs to be enabled. One simple solution is to have a separate index key/property in JSON and do the string search only on that key. This script just does add `_index` key to your JSON whose value is the concatenated values(converted to lower case) of the keys you pass.

For example, you have a JSON like this:

```
var data = [
  {
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pincode": "600061"
  },
  {
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400055"
  }
]
```

and you want to filter this based on query, say `che`, and include all keys in JSON. So a simple script to do that would look like this:

```
function search(q) {
	return data.filter(function(d) {
		return d.city.replace(/ /g, '').toLowerCase().indexOf(q) !== -1 ||
		       d.state.replace(/ /g, '').toLowerCase().indexOf(q) !== -1 ||
		       d.pincode.replace(/ /g, '').toLowerCase().indexOf(q) !== -1
	});
}
```
That's quite lengthy, no? It will be a lot more easier if we just do the replace(), toLowerCase() and indexOf() on only one field instead of all these.

## How to use?

First install index-json

```
npm install index-json --save
```
and then require the module and call `index` function:

```
var ij = require('index-json');
var keys = ['city', 'state', 'pincode']
var dataWithIndex = ij.index(data, keys);
```

dataWithIndex will look like this:

```
[
  {
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pincode": "600061",
    "_index": "chennaitamilnadu600061"
  },
  {
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400055",
    "_index": "mumbaimaharashtra400055"
  }
]
```

and now your search function be like this:

```
function search(q) {
	return dataWithIndex.filter(function(d) {
		return d._index.indexOf(q) !== -1
	});
}
```
