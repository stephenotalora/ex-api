const bodyParser = require('body-parser');
const {loadConfig} = require('node-utils')();

const initializeConfig = (_this, done) => {
	let config = null;

	try {
		config = loadConfig();
	} catch (e) {
		done(e);
	}

	if (config) {
		_this.config = config;
		done(null);
	}
};

const initializeSettings = (_this, done) => {
	_this.set('domain', _this.config.server.host);
	_this.set('port', _this.config.server.port || 3000);
};

const initializeMiddleware = (_this, done) => {
	_this.use(bodyParser.json());

	done(null);
};

module.exports = (_this) => {
	if (!_this) throw new Error("non initialized instance");

	return {
		initializeConfig: initializeConfig.bind(null, _this),
		initializeMiddleware: initializeMiddleware.bind(null, _this),
		initializeSettings: initializeSettings.bind(null, _this)
	};
};
