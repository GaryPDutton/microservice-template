import { defaults } from 'lodash';
import * as fs from  'fs';

export default function(env: any) {
    const config = defaults(env, {
        APP_NAME: process.env.APP_NAME || 'microservice-template',
        NODE_ENV: process.env.NODE_ENV || 'development',
        APP_PORT: process.env.APP_PORT || 3000,
        SSL_KEY: process.env.SSL_KEY || '/etc/ssl/certs/server.key',
        SSL_CERT: process.env.SSL_CERT || '/etc/ssl/certs/server.crt',

        LOGS_V_HOST: process.env.LOGS_V_HOST || '/',
        LOGS_RABBIT_HOST: process.env.LOGS_RABBIT_HOST || 'localhost',
        LOGS_RABBIT_PORT: process.env.LOGS_RABBIT_PORT || '5672',
        LOGS_EXCHANGE_NAME: process.env.LOGS_EXCHANGE_NAME || 'audit-log',
        LOGS_QUEUE_NAME: process.env.LOGS_QUEUE_NAME || 'logs',
        LOGS_EXCHANGE_TYPE: process.env.LOGS_EXCHANGE_TYPE || 'direct',
        LOGS_QUEUE_CREDENTIALS: process.env.LOGS_QUEUE_CREDENTIALS ? process.env.LOGS_QUEUE_CREDENTIALS + '@' : '',
    });

    return Object.assign({}, config, {
        SSL_KEY: fs.readFileSync(config.SSL_KEY),
        SSL_CERT: fs.readFileSync(config.SSL_CERT)
    });

}