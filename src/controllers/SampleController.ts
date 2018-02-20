import { Request, Response, NextFunction } from 'express';
import NotImplementedError from './../errors/NotImplementedError';
import SampleDataService from './../dal/SampleDataService';
import ValidationError from '../errors/ValidationError';
import * as Stringify from 'json-stringify-safe';

// Controller for sample api data, to show how to implement a controller in micro services
export default class SampleController {

    // get method, gets all sample data
    public static get(req: Request, res: Response, next: NextFunction) {
        return SampleDataService.get().then(data => {
            res.status(200).json(data);
        }).catch(next);
    }

    // getById method, gets record by id
    public static getById(req: Request, res: Response, next: NextFunction) {
        return SampleDataService.getById(parseInt(req.params.id)).then(data => {
            res.status(200).json(data);
        }).catch(next);
    }

    // post method, posts new record
    public static post(req: Request, res: Response, next: NextFunction) {
        const newItem = req.body;
        return SampleDataService.add(newItem).then(data => {
            res.status(200).json(data);
        }).catch(next);
    }

    // put method, updates record
    public static put(req: Request, res: Response, next: NextFunction) {
        const item = req.body;
        return SampleDataService.update(item).then(data => {
            res.status(200).json(data);
        }).catch(next);
    }

    // remove method, deleted record
    public static remove(req: Request, res: Response, next: NextFunction) {
        const item = req.body;
        return SampleDataService.remove(item).then(data => {
            res.status(200).json(data);
        }).catch(next);
    }
}

