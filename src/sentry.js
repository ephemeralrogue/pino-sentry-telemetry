import {
	init,
	httpIntegration,
    mongoIntegration,
	rewriteFramesIntegration
} from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import esMain from 'es-main';

// Sentry setup
export default async function initializeSentryIO(dsn) {

    const root = esMain(import.meta);
    console.log(root);
    
    try {

        // const root = new URL('./', import.meta.url);

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
                    root: root,
                })
            ],
            tracesSampleRate: 1.0,
            profilesSampleRate: 1.0,
            registerEsmLoaderHooks: {
                onlyIncludeInstrumentedModules: true,
            },
        });
        console.log('sentry success');

    } catch(error) {
        
        // eslint-disable-next-line no-console
        console.error(
            error,
            'Error initializing Sentry transport'
        );

    }

}