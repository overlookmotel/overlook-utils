// --------------------
// overlook-utils
// Object methods
// --------------------

// imports
var _ = require('./');

// exports

module.exports = {
	// gets obj[key] or if multiple keys provided obj[key1][key2][key3]...
	// returns undefined if any part of key chain does not exist (does not throw typeError)
	get: function(obj) {
		if (arguments.length < 2) throw new Error('cannot call _.get() without specifying at least one key');

		for (var i = 1; i < arguments.length; i++) {
			if (obj === undefined || obj === null) return;

			obj = obj[arguments[i]];
		}

		return obj;
	},

	// sets obj[key] = value
	set: function(obj, key, value) {
		obj[key] = value;
		return obj;
	},

	// setNoUndef(obj, key [,value] [,value] [,value])
	// sets obj[key] = value, but deleting undefined values
	setNoUndef: function(obj, key) {
		var value;
		for (var i = 2; i < arguments.length; i++) {
			value = arguments[i];
			if (value !== undefined) {
				obj[key] = value;
				break;
			}
		}

		if (value === undefined) delete obj[key];

		return obj;
	},

	// defaultNoUndef(obj, key [,value] [,value] [,value])
	// sets obj[key] = value if obj[key] is undefined
	defaultNoUndef: function(obj, key) {
		if (obj[key] !== undefined) return obj;

		var value;
		for (var i = 2; i < arguments.length; i++) {
			value = arguments[i];
			if (value !== undefined) {
				obj[key] = value;
				break;
			}
		}

		return obj;
	},

	// extendNoUndef: function(obj [,fromObj] [,fromObj] [,fromObj])
	// sets all keys from fromObj onto obj, deleting undefined values
	extendNoUndef: function(obj) {
		var fromObj;
		for (var i = 1; i < arguments.length; i++) {
			fromObj = arguments[i];
			_.forIn(fromObj, function(value, key) {
				if (value === undefined) {
					delete obj[key];
				} else {
					obj[key] = value;
				}
			});
		}

		return obj;
	},

	// defaultsNoUndef: function(obj [,fromObj] [,fromObj] [,fromObj])
	// sets all keys from fromObj onto obj where obj[key] is undefined, ignoring undefined values
	defaultsNoUndef: function(obj) {
		var fromObj;
		for (var i = 1; i < arguments.length; i++) {
			fromObj = arguments[i];
			_.forIn(fromObj, function(value, key) {
				if (obj[key] === undefined && value !== undefined) obj[key] = value;
			});
		}

		return obj;
	},

	// removes obj[key] and returns it
	pop: function(obj, key) {
		var value = obj[key];
		delete obj[key];
		return value;
	},

	// gets keys (including those inherited from prototype)
	keysAll: function(obj) {
		var keys = [];
		for (var key in obj) {
			keys.push(key);
		}
		return keys;
	},

	// prototyping
	setPrototype: function(obj, prototype) {
		obj.__proto__ = prototype; // jshint ignore:line
		return obj;
	},

	inheritPrototype: function(obj, prototype) {
		if (!obj) return prototype;
		if (!prototype) return obj;

		_.setPrototype(obj, prototype);
		return obj;
	},

	inheritPropertyPrototype: function(propName, obj, fromObj) {
		if (!fromObj[propName]) return obj[propName];

		if (!obj[propName]) {
			obj[propName] = fromObj[propName];
		} else {
			_.setPrototype(obj[propName], fromObj[propName]);
		}

		return obj[propName];
	},

	// clone/extend/defaults also cloning properties inherited from prototype
	cloneAll: function(fromObj) {
		return _.extendAll({}, fromObj);
	},
	extendAll: function(obj, fromObj) {
		for (var key in fromObj) {
			obj[key] = fromObj[key];
		}
		return obj;
	},
	defaultsAll: function(obj, fromObj) {
		for (var key in fromObj) {
			if (!(key in obj)) obj[key] = fromObj[key];
		}
		return obj;
	},

	// acts on object, inserts key/value pair at position specified by index (integer)
	objectSplice: function(obj, key, value, index) {
		// extract values after index position
		var temp = {};
		if (index === undefined) index = 0;

		var i = 0;
		for (var thisKey in obj) {
			if (i >= index) {
				temp[thisKey] = obj[thisKey];
				delete obj[thisKey];
			}
			i++;
		}

		// insert new key/value
		obj[key] = value;

		// return values back to obj
		for (thisKey in temp) {
			obj[thisKey] = temp[thisKey];
		}

		// done
		return obj;
	},
	// acts on object, inserts key/value pair at 1st position
	unshift: function(obj, key, value) {
		return _.objectSplice(obj, key, value, 0);
	},

	// deletes key/value pairs from object where fn returns true
	delete: function(obj, fn) {
		for (var key in obj) {
			if (fn(obj[key], key)) delete obj[key];
		}

		return obj;
	},
	deleteFalsy: function(obj) {
		return _.delete(obj, function(value) {return !value;});
	},
	deleteNull: function(obj) {
		return _.delete(obj, function(value) {return value === null;});
	},
	deleteUndefined: function(obj) {
		return _.delete(obj, function(value) {return value === undefined;});
	},
	deleteAll: function(obj) {
		for (var i in obj) {
			delete obj[i];
		}
		return obj;
	},

	// alias for deleteAll
	empty: function(obj) {
		return _.deleteAll(obj);
	},

	// convert object to array / array to object
	// array in form [{key: <key>, value: <value>}, ...]
	toArray: function(obj) {
		var arr = [];
		for (var i in obj) {
			arr.push({key: i, value: obj[i]});
			delete obj[i];
		}
		return arr;
	},
	fromArray: function(arr, obj) {
		if (!obj) obj = {};
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i].key] = arr[i].value;
		}

		return obj;
	},

	// sorts object attributes according to order defined by func
	// default: sort by key
	sort: function(obj, func) {
		// define default sort function - by key
		if (!func) func = function(a, b) {return a.key > b.key;};

		// convert object to array
		var arr = _.toArray(obj);

		// sort array using function
		arr.sort(func);

		// convert array back to object
		_.deleteAll(obj);
		_.fromArray(arr, obj);

		// return obj
		return obj;
	},

	// sets obj[key] to value where currently undefined
	defaultValue: function(obj, key, value) {
		if (value !== undefined && obj[key] === undefined) obj[key] = value;
		return obj[key];
	},

	moveValue: function(obj, fromObj, key) {
		if (fromObj[key] !== undefined) obj[key] = fromObj[key];
		delete fromObj[key];
		return obj[key];
	},
	copyValue: function(obj, fromObj, key) {
		if (fromObj[key] !== undefined) obj[key] = fromObj[key];
		return obj[key];
	},

	// get defaults from fromObj where attributes undefined in obj
	// same as _.defaults() except maintains the order of fromObj
	defaultsOrdered: function(obj, fromObj) {
		var orig = _.clone(obj);
		_.deleteAll(obj);
		_.extend(obj, fromObj);
		_.extend(obj, orig);
		return obj;
	},

	typeOf: function(obj) {
		var type = typeof obj;
		if (type != 'object') return type;
		if (Array.isArray(obj)) return 'array';
		return 'object';
	},

	isAnObject: function(obj) {
		if (!_.isObject(obj)) return false;
		if (_.isArray(obj)) return false;
		if (_.isFunction(obj)) return false;
		if (_.isDate(obj)) return false;
		if (_.isRegExp(obj)) return false;
		if (_.isNumber(obj)) return false;
		if (_.isString(obj)) return false;

		return true;
	},

	isEmpty: function(obj) {
		if (obj === undefined || !(obj instanceof Object)) return false;

		for (var i in obj) { // jshint ignore:line
			return false;
		}

		return true;
	}
};
