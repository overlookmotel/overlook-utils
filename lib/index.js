// --------------------
// overlook-utils
// Comprises lodash and underscore.string + extras
// --------------------

// modules
var _ = require('lodash').runInContext(),
	underscoreString = require('underscore.string');

// get lodash
module.exports = _;

// get underscore.string
_.str = underscoreString;

// extend with other functions
_.mixin(_, require('./objects'));
_.mixin(_, require('./arrays'));
_.mixin(_, require('./misc'));
_.mixin(_.str, require('./strings'));

// mixin string functions into _
_.mixin(_.str.exports());
_.includes = _.str.include;
