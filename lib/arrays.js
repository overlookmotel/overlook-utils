// --------------------
// overlook-utils
// Array methods
// --------------------

// imports
var _ = require('./');

// exports

module.exports = {
	// push item onto end of array if not already in array
	pushNoDup: function(arr, item) {
		if (arr.indexOf(item) == -1) arr.push(item);
		return arr;
	},

	unshiftNoDup: function(arr, item) {
		if (arr.indexOf(item) == -1) arr.unshift(item);
		return arr;
	},

	// array splice but inserts several elements provided as array, rather than as several arguments
	// e.g. _.spliceArray([1,2,3], 1, 1, [8,9]) => [1,8,9,3]
	// equivalent to [1,2,3].splice(1, 1, 8, 9)
	spliceArray: function(arr, pos, length, replaceArr) {
		var args = _.clone(replaceArr);
		args.unshift(pos, length);
		return arr.splice.apply(arr, args);
	},

	// unshift items onto start of array
	unshiftArray: function(arr, unshiftArray) {
		return arr.unshift.apply(arr, unshiftArray);
	},

	// push items onto end of array
	pushArray: function(arr, pushArray) {
		return arr.push.apply(arr, pushArray);
	},

	// find first item where callback returns non-undefined value
	// returns the value returned by callback
	findAndReturn: function(arr, fn) {
		var result;

		_.forEach(arr, function(item, key) {
			var value = fn(item, key, arr);
			if (value !== undefined) {
				result = value;
				return false;
			}
		});

		return result;
	}
};
