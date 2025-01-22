import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";
import { CommonMessages, HttpStatusCode } from "../utils/send-response";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            success: false,
            errors: err.serializeErrors(),
        });
        return;
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: CommonMessages.INTERNAL_SERVER_ERROR,
        data: null,
    });
};

export { errorHandler };
