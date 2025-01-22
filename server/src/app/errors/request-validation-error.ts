import { CustomError } from "./custome-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: { field: string; message: string }[]) {
        super("Validation error");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return {
            message: "Request validation failed.",
            details: this.errors
        };
    }
}
