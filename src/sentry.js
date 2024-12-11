import {
	init,
	httpIntegration,
    mongoIntegration,
	rewriteFramesIntegration
} from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Sentry setup
export default function initializeSentryIO(dsn) {
    const root = new URL('./', import.meta.url);

    init({
        dsn: dsn,
        environment: process.env.NODE_ENV,
        defaultIntegrations: false,
        integrations: [
            httpIntegration({
                tracing: true
            }),
            mongoIntegration({
                tracing: true
            }),
            nodeProfilingIntegration,
            rewriteFramesIntegration({
                root: root
            })
        ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
        registerEsmLoaderHooks: {
            onlyIncludeInstrumentedModules: true,
        },
    });
}