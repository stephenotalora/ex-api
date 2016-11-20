/**
 * @author Jonathan S. Otalora
 * All rights reserved
 */
const {loadConfig} = require('node-utils')();

/**
 * initializeConfig
 * Initializes the environment configuration
 * @param  {Object}   app      - the express app
 * @param  {Function} callback - the async waterfall callback
 */
module.exports = exports = (app, callback) => {
	let config = null;

	try {
		config = loadConfig();
	} catch (e) {
		callback(e, null);
	}

	if (config) {
		callback(null, config);
	}
};
