import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';

// Mutate the request and add the correlation ID from the header
export default (req: Request, res: Response, next: NextFunction)  => {
    req.correlationId = req.headers.correlationId || uuid.v4();
    next();
};