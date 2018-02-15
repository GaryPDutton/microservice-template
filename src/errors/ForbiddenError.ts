/**
 * Error for access to a inaccessible part fot he API
 */
export default class ForbiddenError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'ForbiddenError';
    }
}