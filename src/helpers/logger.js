import winston, { exceptions } from 'winston';

// const logFileName = path.join(__dirname, '../../', 'logs/combined.log');
// const errorLogFileName = path.join(__dirname, '../../', 'logs/exceptions.log');
let logger = null;

async function initLogger() {
	try {
		logger = await winston.createLogger({
			format: winston.format.json(),
			exceptionHandlers: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: './logs/exceptions.log',
					level: 'error',
					// maxSize: config.logger.maxSize,
					// maxFiles: config.logger.maxFiles
				})
			],

			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: './logs/combined.log',
					// maxSize: config.logger.maxSize,
					// maxFiles: config.logger.maxFiles
				})
			]
		});
	}
	catch(err) {
		throw err;
	}
}

function logInfo( message, data) {
	logger.log('info', message, data);
}

function logError( message, data) {
	logger.log('error', message, data);
}

function logWarn( message, data) {
	logger.log('warn', message, data);
}

function logDebug( message, data) {
	logger.log('debug', message, data);
}

function logSilly( message, data) {
	logger.log('silly', message, data);
}

export {
	initLogger,
	logInfo,
	logError,
	logWarn,
	logDebug,
	logSilly
};
