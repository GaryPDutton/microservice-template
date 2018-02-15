/**
 * Endpoint not found.
 */
export default class NotFoundError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}