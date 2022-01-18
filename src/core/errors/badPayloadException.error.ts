export class BadPayloadException extends Error {
    constructor(message: string) {
        super(message);
    }
}
