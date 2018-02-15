/**
 * Error for conflicting information.
 */
export default class NotImplementedError extends Error {
    name: string;

    constructor (message?: string) {
        super(message);
        this.name = 'NotImplementedError';
    }
}