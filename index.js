/* eslint-disable no-console */
const app = require('express')();
const async = require('async');
const initMiddleware = require('./src/middleware');
// const routes = require('./routes')(app);

module.exports = exports = {};

/**
 * boot
 * kicks the server
 * @param  {Function} done - serial sequence
 */
const boot = (done) => {
	const _this = exports;

	// initialize middleware and server iff middleware is successfull
	initMiddleware(app)
	.then(() => {
		_this.server = app.listen(app.get('port'), app.get('domain'), () => {
			console.log(`app initialized successfully on port ${app.get('port')}`);
			done();
		});
	})
	.catch(done);
};


/**
 * initExports
 * initiazes the module
 * @param  {Function} done - serial sequence
 */
const initExports = (done) => {
	const _this = exports;
	_this.boot = boot;
	_this.shutDown = shutDown;
	// _this.routes = routes;
	done();
};

/**
 * shutDown
 * closes the connection to the http server
 */
const shutDown = () => {
	const _this = exports;
	_this.server.close();
};

/**
 * initSerial
 * initializes the serial sequence
 */
const initSerial = () => {
	async.series([
		boot,
		initExports
	], (err) => {
		if (err) console.error(err);
	});
};


// initialize server or module exports
if (module === require.main) {
	initSerial();
} else {
	// module is required
	initExports();
}
