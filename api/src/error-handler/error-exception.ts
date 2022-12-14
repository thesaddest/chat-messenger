/* eslint-disable @typescript-eslint/no-explicit-any */
export class ErrorException extends Error {
    public status: number = null;
    public errors: any = null;
    constructor(status: number, message: string, errors: any = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedErorr() {
        return new ErrorException(401, "User is not authorized");
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ErrorException(400, message, errors);
    }
}
