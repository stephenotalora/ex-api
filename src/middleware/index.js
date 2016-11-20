const async = require('async');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const _initParsers = (app) => {
	const {parsers: {urlencoded}} = app.get('settings');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded(urlencoded));
};

const initMiddleware = (app, callback) => {
	_initParsers(app);

	callback(null);
};

module.exports = exports = (app) => {
	return new Promise((resolve, reject) => {
		async.waterfall([
			(cb) => {
				require('./initConfig')(app, cb);
			}, (config, cb) => {
				require('./initSettings')(app, config, cb);
			}, (cb) => {
				initMiddleware(app, cb);
			}
		], (err) => {
			if (err) return reject(err);
			return resolve();
		});
	});
};
