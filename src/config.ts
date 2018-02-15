import { defaults } from 'lodash';
import * as fs from  'fs';

export default function(env: any) {
    const config = defaults(env, {
        APP_NAME: process.env.APP_NAME || 'microservice-template',
        NODE_ENV: process.env.NODE_ENV || 'development',
        APP_PORT: process.env.APP_PORT || 3000,
        SSL_KEY: process.env.SSL_KEY || '/etc/ssl/certs/server.key',
        SSL_CERT: process.env.SSL_CERT || '/etc/ssl/certs/server.crt'
    });

    return Object.assign({}, config, {
        SSL_KEY: fs.readFileSync(config.SSL_KEY),
        SSL_CERT: fs.readFileSync(config.SSL_CERT)
    });

}