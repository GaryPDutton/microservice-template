import { Request, Response, NextFunction } from 'express';
import ValidationError from './../errors/ValidationError';

// Simple validation middleware to show how to run some easy logic in the pipeline
export default (req: Request, res: Response, next: NextFunction)  => {
    const item = req.body;
    const id = parseInt(req.params.id);

    if (item && item.id === id) {
        next();
    } else {
        next(new ValidationError(item ? 'Parameter ID does not match items ID' : 'Invalid or missing item'));
    }
};