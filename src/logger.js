import pino from 'pino';
import {
    addBreadcrumb,
    captureException
} from '@sentry/node';
import initializeSentryIO from './sentry.js';

export default function (dsn, options) {
    
    const logLevel = process.env.NODE_ENV === 'production'
        ? process.env.PINO_LOG_LEVEL || 'info'
        : 'trace';
    
    const transport = process.env.NODE_ENV === 'production'
        ? pino.transport({
            target: 'pino-sentry-transport',
            options: {
                name: process.env.APP_NAME,
                level: logLevel,
                batching: true,
                interval: 5,
                sentry: {
                    dsn
                }
            }
        })
        : pino.transport({
            target: 'pino-pretty',
        });
    
    const logger = pino(options, transport);

    const Log = {

        fatal(options, message) {
            logger.fatal(options, message);
            addBreadcrumb({
                level: 'fatal',
                message: message,
                data: options
            });
        },
    
        error(options, error, message) {
            try {
                captureException(error, options);
                logger.error(options, message);
            } catch(error) {
                logger.error(error, 'Error processing error handling');
            }
            addBreadcrumb({
                type: 'error',
                categorty: 'error',
                level: 'error',
                message: message,
                data: options
            });
        },
    
        warn(options, message) {
            logger.warn(options, message);
            addBreadcrumb({
                level: 'warn',
                message: message,
                data: options
            });
        },
    
        info(options, message, type) {
            logger.info(options, message);
            addBreadcrumb({
                type: type,
                level: 'info',
                message: message,
                data: options
            });
        },
    
        debug(options, message) {
            logger.debug(options, message);
            addBreadcrumb({
                level: 'debug',
                message: message,
                data: options
            });
        },
    
        trace(options, message) {
            logger.trace(options, message);
            addBreadcrumb({
                level: 'trace',
                message: message,
                data: options
            });
        },
    
        flush() { logger.flush(); }
    };
    
    initializeSentryIO(dsn);

    return Log;

}