import { Request, Response, NextFunction } from 'express';

/**
* Handles any errors thrown in the next function of any other middleware.
* Displays an easy to read message to the calling API and handles
* status codes.
*
* Use next(Error) to get here.
*/
export default (config: any) =>
    (err: any, req: Request, res: Response, next: NextFunction) => {
        const data = config.NODE_ENV === 'development' ? err : undefined;
        switch (err.name) {
        case 'UnauthorizedError':
            res.boom.unauthorized(err.message, data);
            break;
        case 'ForbiddenError':
            res.boom.forbidden(err.message, data);
            break;
        case 'ValidationError':
            res.boom.badRequest(err.message, data);
            break;
        case 'ConflictError':
            res.boom.conflict(err.message, data);
            break;
        case 'NotFoundError':
            res.boom.notFound(err.message, data);
            break;
        case 'NotImplementedError':
            res.boom.notImplemented(err.message);
            break;
        default:
            res.boom.badImplementation(err.message);
        }

        next(err);
    };