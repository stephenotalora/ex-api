/**
 * @author Jonathan S. Otalora
 * All rights reserved
 */

 /**
  * initializeSettings
  * Initializes any configs / settings for the main app
  * @param  {Object}   app      - the Express app
  * @param  {Object}   config   - the app config object
  * @param  {function} callback - the async waterfall callback
  */
module.exports = exports = (app, {server}, callback) => {
	const {host, port, settings} = server;

	app.set('domain', host);
	app.set('port', port);
	app.set('settings', settings);

	callback(null);
};
