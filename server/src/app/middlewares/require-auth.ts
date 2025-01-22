import { NextFunction, Request, Response } from "express"
import { JWTUserPayload, verifyJwt } from "../utils/jwt";
import { CustomError, ForbiddenError, NotAuthorizedError } from "../errors";

declare module 'express-serve-static-core' {
    interface Request {
      user?: JWTUserPayload;
    }
  }

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new NotAuthorizedError());
    }

    const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_ACCESS_SECRET as string;
        console.log(token)

        if (!secret) {
            return next(new Error("Can't access JWT_ACCESS_SECRET in requireAuth"));
        }

        if (!token) {
            return next(new NotAuthorizedError());
        }

        try {
            const user = verifyJwt(token, secret);

            if (!user) {
                //if token expire
                return next(new NotAuthorizedError());
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof CustomError) {
                return next(error);
            }
            console.log(error)
            return next(new ForbiddenError());
        }
    } catch (error) {
        next(error)
    }
    }