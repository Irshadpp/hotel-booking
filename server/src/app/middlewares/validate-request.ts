import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errObjects = errors
      .array()
      .map((item: any) => ({ field: item.path, message: item.msg }));
    throw new RequestValidationError(errObjects);
  }
  next();
};
