import { CustomError } from "./custome-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string = "Not authorized") {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): {message: string; details?: any } {
    return {
      message: this.message,
    };
  }
}
