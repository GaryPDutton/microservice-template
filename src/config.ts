import { defaults } from 'lodash';
import * as fs from  'fs';

export default function(env: any) {
    const config = defaults(env, {
        APP_NAME: process.env.APP_NAME || 'microservice-template',
        NODE_ENV: process.env.NODE_ENV || 'development',
        APP_PORT: process.env.APP_PORT || 3000,
        SSL_KEY: process.env.SSL_KEY || '/etc/ssl/certs/server.key',
        SSL_CERT: process.env.SSL_CERT || '/etc/ssl/certs/server.crt',

        // Config for logging to queue
        LOGS_V_HOST: process.env.LOGS_V_HOST || '/',
        LOGS_RABBIT_HOST: process.env.LOGS_RABBIT_HOST || 'localhost',
        LOGS_RABBIT_PORT: process.env.LOGS_RABBIT_PORT || '5672',
        LOGS_EXCHANGE_NAME: process.env.LOGS_EXCHANGE_NAME || 'audit-log',
        LOGS_QUEUE_NAME: process.env.LOGS_QUEUE_NAME || 'logs',
        LOGS_EXCHANGE_TYPE: process.env.LOGS_EXCHANGE_TYPE || 'direct',
        LOGS_QUEUE_CREDENTIALS: process.env.LOGS_QUEUE_CREDENTIALS ? process.env.LOGS_QUEUE_CREDENTIALS + '@' : '',

        // Config for queue processing
        QUEUE_ON: process.env.QUEUE_ON || true,
        V_HOST: process.env.V_HOST || '/',
        RABBIT_HOST: process.env.RABBIT_HOST || 'localhost',
        RABBIT_PORT: process.env.RABBIT_PORT || '5672',
        EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'test-exchange',
        QUEUE_NAME: process.env.QUEUE_NAME || 'test-queue',
        EXCHANGE_TYPE: process.env.EXCHANGE_TYPE || 'direct',
        QUEUE_CREDENTIALS: process.env.QUEUE_CREDENTIALS ? process.env.QUEUE_CREDENTIALS + '@' : ''
    });

    return Object.assign({}, config, {
        SSL_KEY: fs.readFileSync(config.SSL_KEY),
        SSL_CERT: fs.readFileSync(config.SSL_CERT)
    });

}