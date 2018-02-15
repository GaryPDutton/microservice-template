import { Request, Response, NextFunction } from 'express';

// Middleware to mutate the request to add a function that will send a put.
export default (log: any) => (req: Request, res: Response, next: NextFunction) => {
        req.log = log;
        next();
};