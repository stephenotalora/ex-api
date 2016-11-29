const async = require('async');
const bodyParser = require('body-parser');
const {isDev} = require('node-toolbox');
const mogan = require('morgan');
const path = require('path');
const rootDir = require('app-root-dir');
const Promise = require('bluebird');
const seveStatic = require('serve-static');

const _initParsers = (app) => {
	const {parsers: {urlencoded}} = app.get('settings');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded(urlencoded));
};

const initMiddleware = (app, callback) => {
	_initParsers(app);

	app.use(mogan(isDev() ? 'dev' : 'tiny'));
	app.use(seveStatic(path.join(rootDir.get(), 'public')));

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
