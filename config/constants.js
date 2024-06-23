try {
	// =============== DotEnv =====================//

	let yamlConfigLib = require('node-yaml-config');
	var env = yamlConfigLib.load(__dirname + `/../config.yaml`);

	// ================ Env List =================== //

	// App Info
	const HOST_NAME = env?.app?.hostName ? env?.app?.hostName : 'localhost';
	const HOST = env?.app?.hostURL ? env?.app?.hostURL : 'http://localhost:3000';
	const WEB_URL = env?.web?.url ? env?.web?.url : 'http://localhost:4200';

	const APP_ENV = env?.app?.env ? env?.app?.env : 'local';
	const APP_TITLE = env?.app?.title ? env?.app?.title : 'RSS';
	const APP_PORT = env?.app?.port ? env?.app?.port : 3000;
	const API_VERSION = env?.app?.version ? env?.app?.version : 1.0;
	const COOKIE_KEY = env?.app?.cookieKey ? env?.app?.cookieKey : '';

	const APP_SECRET = env?.secret?.key ? env?.secret?.key : '';
	const EXPIRE_IN = env?.secret?.expiresIn ? env?.secret?.expiresIn : '';

	
	// Mongodb Database
	const DB_HOST = env?.db?.development ? env?.db?.development : '';






	module.exports = {
		// APP INFO Constants
		HOST_NAME,
		HOST,
		APP_ENV,
		APP_TITLE,
		APP_PORT,
		API_VERSION,
		WEB_URL,

		// App Config & Secrets
		COOKIE_KEY,
		APP_SECRET,
		EXPIRE_IN,

		// MySQL Database
		DB_HOST,

	}
} catch (error) {
	console.log(`error in config constants => ${error}`)
	process.exit(1)
}
