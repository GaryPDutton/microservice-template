import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import head = require('lodash/head');
import omit = require('lodash/omit');

// Validate schema
function validate(subject: any, schema: any) {
    return new Promise(function (resolve, reject) {
        return Joi.validate(subject, schema, function (error) {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
}

// Middleware to validate all passed schemas
export default function (schemas: any) {
    return function (req: Request, res: Response, next: NextFunction) {

        const validations = Object
            .keys(schemas)
            .map(key => validate(omit(req[key], '_'), schemas[key]));

        return Promise.all(validations).then(() => next()).catch(next);

    };
}