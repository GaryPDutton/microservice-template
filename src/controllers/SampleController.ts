import { Request, Response, NextFunction } from 'express';
import NotImplementedError from './../errors/NotImplementedError';

// Controller for sample api data, to show how to implement a controller in micro services
export default class SampleController {

    // get method, gets all sample data
    public static get(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError('get: not implemented'));
    }

    // getById method, gets record by id
    public static getById(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError('getById: not implemented'));
    }

    // post method, posts new record
    public static post(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError('post: not implemented'));
    }

    // put method, updates record
    public static put(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError('put: not implemented'));
    }

    // remove method, deleted record
    public static remove(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError('delete: not implemented'));
    }
}

