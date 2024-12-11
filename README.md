# pino-sentry-telemetry

this package is designed to standardize logging practices across all 
ephemeralrogue projects. it runs pino.js, piping logs through pino-pretty in 
local development, and transports logs to sentry.io in production.  

built in js esm for js projects, for node versions 21+.  

## usage

this package will initialize sentry and return an instance of pino. simply pass 
your sentry `dsn` and pino options into the exported `pinoInit` function:  


```
// logger.js

import pinoSentryInit from '@ephemeralrogue/pino-sentry-telemetry';  

const options = {  
    // set your pino options here  
}  

const Log = pinoSentryInit(dsn, options);  

export default Log;  
```

where `dsn` corresponds to your sentry dsn. recommended best practice is to 
set this up as an environment variable and pass it as 
`process.env.SENTRY_IO_DSN`.  

this package reads environment from `process.env.NODE_ENV`; set it accordingly.

logging works similarly as using pino.js directly. simply import `Log` where 
needed:

```
import Log from './logger.js' // or whatever you named your file

Log.info({
    transaction: 'some specific detail you want to include in your logs'
}, 'here is the message for the log', 'type');

Log.error(error, 'an error has occurred, oh no!');
```

## considerations

future updates include:  

- deeper sentry integration

feel free to experiment and raise a pr.