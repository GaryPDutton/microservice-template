import { Request, Response, NextFunction } from 'express';

import RequestPayload from '../models/RequestPayload';
import ResponsePayload from '../models/ResponsePayload';

/**
 * Logs the IO details for this microservice on request and after the response has
 * been sent
 */
export default (req: Request, res: Response, next: NextFunction) => {
    // When the request has finished write a log.
    req.log.info(new RequestPayload(req));
    // On each response send an audit.
    res.on('finish', function () {
        req.log.info(new ResponsePayload(req, res));
    });

    next();
};