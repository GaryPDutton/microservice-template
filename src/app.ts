import * as https from 'https';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as boom from 'express-boom';
import logger from './logger';
import logMiddleware from './middleware/log';
import devLoggingMiddleware from './middleware/devLogging';
import ioLoggingMiddleware from './middleware/ioLogging';
import configMiddleware from './middleware/config';
import errorMiddleware from './middleware/error';
import correlationMiddleware from './middleware/correlationId';
import NotFoundError from './errors/NotFoundError';
import statusRoute from './routes/status';
import sampleApi from './routes/sampleApi';
import queueProcessing from './queueProcessing';

export default function(config: any) {
    const app = express();
    const log = logger(config);

    const serverOptions = { key: config.SSL_KEY, cert: config.SSL_CERT };

    // The order of the following middleware is important!
    // Harden response - security
    app.use(helmet());

    // Parse body into an object
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    // Get the cookie from the header and add to request
    app.use(cookieParser());

    // Allow the use of boom when sending errors to user
    app.use(boom());

    // Attach correlation ID if not present
    app.use(correlationMiddleware);

    // Attach logger middleware
    app.use(logMiddleware(log));
    app.use(devLoggingMiddleware(config));
    app.use(ioLoggingMiddleware);

    // Attach config middleware
    app.use(configMiddleware(config));

    // Routes
    app.get('/api/status', statusRoute);

    // Add sample api routes
    sampleApi(app);

    if (config.QUEUE_ON) queueProcessing(config, log);

    // Handle 404 errors
    app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError('Not Found')));

    // Error handler
    app.use(errorMiddleware(config));

    // Start express server
    https.createServer(serverOptions, app)
        .listen(config.APP_PORT, () => {
            log.info(`Listening on port ${config.APP_PORT}.`);
        });
}




