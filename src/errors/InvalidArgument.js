export class InvalidArgument extends Error {
    constructor() {
        super('Invalid argument!');
        this.type = 'INVALID_ARGUMENT';
    }
}