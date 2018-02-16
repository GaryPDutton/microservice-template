import { Request, Response, NextFunction } from 'express';

/**
 * Payload for every request
 */
export default class RequestPayload {
    _messageType: string;
    _user: string;
    _sourceUri: string;
    _destination: string;
    _method: string;
    _correlationId: string;

    /**
     * Instantiates the class
     */
    constructor(req: Request) {
        this._messageType = 'REQUEST';
        this._user = req.user ? req.user.username : 'unknown';
        this._sourceUri = req.headers.host;
        this._destination = req.url;
        this._method = req.method;
        this._correlationId = req.correlationId;
    }
}