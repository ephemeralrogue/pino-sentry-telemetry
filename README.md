# pino-sentry-telemetry

this package is designed to standardize logging practices across all
ephemeralrogue projects. it runs pino.js, piping logs through pino-pretty in
local development, and transports logs to sentry.io in production.  

built in js esm for js projects, for node versions 21+.  

## usage

this package will initialize a logger and sentry instance and return a `Log`
object with the log levels `trace`, `debug`, `info`, `warn`, `error`, `fatal`,
and `flush`.

initialize this package in a `logger.js` file:  

```
import pinoSentry from '@ephemeralrogue/pino-sentry-telemetry'; 

const Log = pinoSentry(dsn, options); 

export default Log;
```
where `dsn` corresponds to your sentry dsn. recommended best practice is to set 
this up as an environment variable and pass it as `process.env.SENTRY_IO_DSN`.  

this package reads environment from `process.env.NODE_ENV`; set it accordingly.

logging works similarly as using pino.js directly:  
```
Log.info({
    transaction: 'some specific detail you want to include in your logs'
}, 'here is the message for the log', 'type');

Log.error(error, 'an error has occurred, oh no!');
```

the default log levels have been modified to include adding breadcrumbs to 
sentry where applicable.

## considerations

due to the customization of default log levels, custom levels cannot be added 
at this time. furthermore, child loggers do not operate.  

as such, future updates include:  

- custom level instantiation
- deeper sentry integration
- child logging capabilities
- setup github actions to automate new package release to npm

feel free to raise a pr over any of these issues.