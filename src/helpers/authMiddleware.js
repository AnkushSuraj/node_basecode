import { RESPONSE_CODES } from '../config/constants.js';
import { verifyToken } from './auth.js';
import { logInfo } from './logger.js';

export const authMiddleWare = async (req, res, next) => {
    try {
        // const logger = loggerData(req)
        const ignorePaths = ['/api_v_1/user/register','/api_v_1/user/login'];

        const {
            method,
            headers,
            originalUrl
        } = req;

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const logObj = {
            ip,
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
            timestamp: Date.now()
        };

        // if ((method === 'GET')) {
        //   logInfo('Activity Log: ', logObj);
        //   // ignoring register URL
        //   return next();
        // }

        const ignoreIndex = ignorePaths.findIndex(item => item === originalUrl);
        if (ignoreIndex > -1) {
            logInfo('Activity Log: ', logObj);
            return next();
        }

        if (!headers.authorization) {
            logInfo('Activity Log: ', logObj);
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
        }

        logObj.user = await verifyToken(headers.authorization);
        req.user = logObj.user;
        logInfo('Activity Log: ', logObj);
        return next();
    }
    catch (error) {
        return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error });
    }
};