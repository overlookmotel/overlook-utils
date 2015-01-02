// --------------------
// overlook-utils
// String methods
// --------------------

// modules
var inflection = require('inflection');

// imports
var _ = require('./');

// exports

var _str = module.exports = {
	// string manipulation
	singularize: function(str) {
		return inflection.singularize(str);
	},
	pluralize: function(str) {
		return inflection.pluralize(str);
	},
	//NB capitalize already included in underscore.string
	uncapitalize: function(str) {
		str = str == null ? '' : String(str);
		return str.charAt(0).toLowerCase() + str.slice(1);
	},

	// string format conversion from camelCase or underscored format to human-readable format
	// e.g. 'fooBar' -> 'Foo Bar', 'foo_bar' -> 'Foo Bar'
	humanize: function(str) {
		if (str === null || str === undefined || str == '') return '';
		str = ('' + str).replace(/[-_\s]+(.)?/g, function(match, c) {return c ? c.toUpperCase() : '';}); // jshint ignore:line
		return str.slice(0, 1).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
	},

	parentUrl: function(url) {
		if (_.endsWith(url, '/')) url = url.slice(0, -1);
		return url.substr(0, url.lastIndexOf('/') + 1);
	},

	// get nth appearance of needle in str
	indexOfNth: function(str, needle, num) {
		if (num === undefined) {
			num = 1;
		} else if (num == 0) {
			return -1;
		}

		var index = -1;
		for (var i = 0; i < num; i++) {
			index = str.indexOf(needle, index + 1);
			if (index == -1) break;
		}

		return index;
	},

	// convert to/from dd/mm/yyyy format
	dateToString: function(date) {
		if (!date) return;

		var d = date.getDate();
		if (d < 10) d = '0' + d;
		var m = date.getMonth() + 1;
		if (m < 10) m = '0' + m;
		var y = date.getFullYear();

		return d + '/' + m + '/' + y;
	},
	stringToDate: function(str) {
		var parts = str.split('/');
		return new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], 0, 0, 0, 0));
	},

	// convert to/from hh/mm/ss format (24hr clock)
	timeToString: function(date) {
		var h = date.getHours();
		if (h < 10) h = '0' + h;
		var m = date.getMinutes();
		if (m < 10) m = '0' + m;
		var s = date.getSeconds();
		if (s < 10) s = '0' + s;

		return h + ':' + m + ':' + s;
	},
	stringToTime: function(str) {
		var parts = str.split(':');
		return new Date(0, 0, 0, parts[0], parts[1], parts[2], 0);
	},

	// convert to/from dd/mm/yyyy hh/mm/ss format (24hr clock)
	dateTimeToString: function(date) {
		return _str.dateToString(date) + ' ' + _str.timeToString(date);
	},
	stringToDateTime: function(str) {
		var parts = str.split(' '),
			dateParts = parts[0].split('/'),
			timeParts = parts[1].split(':');

		return new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2], 0));
	},

	/*
	// THESE NOT USED AT PRESENT

	// pad start of string to required length
	padString: function(str, pad, len) {
		while (str.length < len) {
			str = pad + str;
		}

		return str;
	},

	// join all arguments inserting spaces in between (ignoring empty arguments)
	joinSpaced: function() {
		var str = '';

		for (var i = 0; i < arguments.length; i++) {
			var thisStr = arguments[i];
			if (thisStr == '' || thisStr == null) continue;

			if (str != '') str += ' ';
			str += thisStr;
		}

		return str;
	}
	*/
};

// alter escapeHTML to replace line returns with <br />
var escapeHTMLOrig = _.str.escapeHTML;
_str.escapeHTML = function(text, lineBreak) {
	lineBreak = lineBreak || '<br />';
	return escapeHTMLOrig(text).replace(/\n/g, lineBreak);
};
