/**
 * Error for conflicting information.
 */
export default class ConflictError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'ConflictError';
    }
}