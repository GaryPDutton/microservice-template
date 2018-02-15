/**
 * No allowed to access the system
 */
export default class UnauthorizedError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}