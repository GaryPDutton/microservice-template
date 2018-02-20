import * as bunyan from 'bunyan';
import { LoggerOptions } from 'bunyan';
import BunyanTransport from './classes/BunyanTransport';
import IQueueLoggingConfiguration from './interfaces/IQueueLoggingConfiguration';

export default function(config: IQueueLoggingConfiguration) {
    const loggerOptions = {
        name: config.APP_NAME,
        streams: [
            // Log to the command line
            {
                stream: process.stdout,
                level: 'trace',
            },
            // And to queue that will end up in ELK
            {
                type: 'raw',
                level: 'trace',
                stream: new BunyanTransport(config)
            }
        ],
    };

    return bunyan.createLogger(loggerOptions as LoggerOptions);
}



