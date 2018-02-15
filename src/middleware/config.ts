import { Request, Response, NextFunction } from 'express';

/**
 * Pass the config and return alter the request with that config to be used
 * by subsequent middleware. Mutate the request object with the configuration
 */
export default (config: any) => (req: Request, res: Response, next: NextFunction) => {
        req.config = config;
        next();
    };