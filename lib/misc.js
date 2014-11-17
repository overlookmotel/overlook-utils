// --------------------
// overlook-utils
// Misc methods
// --------------------

// imports
var _ = require('./');

// exports

module.exports = {
	// --------------------
	// misc
	// --------------------
	
	// convert function arguments to array
	argumentsToArray: function(args) {
		return Array.prototype.slice.call(args);
	},
	
	// if value is function, run it with arguments and return result, otherwise return input
	functionValue: function(val) {
		if (!_.isFunction(val)) return val;
		
		var args = Array.prototype.slice.call(arguments, 1);
		return val.apply(null, args);
	}
};
