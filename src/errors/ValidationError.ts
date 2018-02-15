/**
 * Can be created by JOI if the user is not allowed to access.
 */
export default class ValidationError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'ValidationError';
    }
}