import { Request, Response, NextFunction } from 'express';
import RequestPayload from './RequestPayload';

/**
 * Payload for every response
 */
export default class ResponsePayload extends RequestPayload {
    _status: number;

    /**
     * Instantiates the class
     */
    constructor(req: Request, res: Response) {
        super(req);
        this._messageType = 'RESPONSE';
        this._status = res.statusCode;
    }
}