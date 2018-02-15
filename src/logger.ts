import * as bunyan from 'bunyan';
import { LoggerOptions } from 'bunyan';
import BunyanTransport from './models/BunyanTransport';
import IQueueConfiguration from './interfaces/IQueueConfiguration';

export default function(config: IQueueConfiguration) {
    const loggerOptions = {
        name: config.APP_NAME,
        streams: [
            // Log to the command line
            {
                stream: process.stdout,
                level: 'trace',
            },
            // And to queue that will end up in Kibana
            {
                type: 'raw',
                level: 'trace',
                stream: new BunyanTransport(config)
            }
        ],
    };

    return bunyan.createLogger(loggerOptions as LoggerOptions);
}



