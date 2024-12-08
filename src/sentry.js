import {
	init,
	Integrations,
	rewriteFramesIntegration
} from '@sentry/node';
import Log from './logger.js';

// Sentry setup
export default function initializeSentryIO(dsn) {
    try {
        const root = new URL('./', import.meta.url);
        init({
            dsn: dsn,
            tracesSampleRate: 1.0,
            environment: process.env.NODE_ENV,
            integrations: [
                rewriteFramesIntegration({
                    root: root,
                }),
                new Integrations.Http({
                    tracing: true
                })
            ]
        });
    } catch(error) {
        Log.error(
            error,
            'Error initializing Sentry transport'
        );
    }
}