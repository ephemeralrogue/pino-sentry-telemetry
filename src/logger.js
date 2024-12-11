import initializeSentryIO from './sentry.js';
import pino from 'pino';

function setTransport(dsn) {
    if (process.env.NODE_ENV !== 'production') {

        // eslint-disable-next-line no-console
        console.log('pino transport set to pino-pretty');

        return pino.transport({
            target: 'pino-pretty',
            options: {
                level: 'trace'
            }
        });
    }

    // eslint-disable-next-line no-console
    console.log('pino transport set to sentry');

    return pino.transport({
        target: 'pino-sentry-transport',
        options: {
            sentry: {
                dsn: dsn,
            },
            withLogRecord: true,
            level: 'info',
            tags: [ 'level' ],
            expectPinoConfig: true
        }
    });
    
}

export default function pinoInit(dsn, options) {

    initializeSentryIO(dsn);

    const transport = setTransport(dsn);

    try {

        return pino(options, transport);
    } catch(error) {
        // eslint-disable-next-line no-console
        console.error(error, 'Error initializing pino');
    }
}