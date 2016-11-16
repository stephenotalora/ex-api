const async = require('async');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const {loadConfig} = require('node-utils')();

/**
 * initializeConfig
 * Initializes the environment configuration
 * @param  {Object}   app      - the express app
 * @param  {Function} callback - the async waterfall callback
 */
const initConfig = (app, callback) => {
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

/**
 * initializeSettings
 * Initializes any configs / settings for the main app
 * @param  {Object}   app      - the Express app
 * @param  {Object}   config   - the app config object
 * @param  {function} callback - the async waterfall callback
 */
const initSettings = (app, {server: {host, port}}, callback) => {
	app.set('domain', host);
	app.set('port', port);
	callback(null);
};

const initMiddleware = (app, callback) => {
	app.use(bodyParser.json());
	callback(null);
};

module.exports = exports = (app) => {
	return new Promise((resolve, reject) => {
		async.waterfall([
			(cb) => {
				initConfig(app, cb);
			}, (config, cb) => {
				initSettings(app, config, cb);
			}, (cb) => {
				initMiddleware(app, cb);
			}
		], (err) => {
			if (err) return reject(err);
			return resolve();
		});
	});
};
