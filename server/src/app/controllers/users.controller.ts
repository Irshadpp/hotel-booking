import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  ForbiddenError,
  NotAuthorizedError,
} from "../errors";

import {
  generateJwtAccessToken,
  generateJwtRefreshToken,
  JWTUserPayload,
  verifyJwt,
} from "../utils/jwt";
import {
  CommonMessages,
  HttpStatusCode,
  sendResponse,
} from "../utils/send-response";
import Password from "../utils/password";
import userService from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError("User already exists in this email!");
    }
    const { password } = req.body;
    const hashedPassword = await Password.toHash(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
    });
    sendResponse(res, HttpStatusCode.CREATED, "Created user successfully", {
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password!");
    }

    const matchPassword = await Password.compare(user.password, password);
    if (!matchPassword) {
      throw new BadRequestError("Invalid email or password!");
    }

    const payload: JWTUserPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );

    sendResponse(res, HttpStatusCode.OK, "Login successful", {
      accessToken,
      refreshToken,
      user: payload,
    });
  } catch (error) {
    next(error);
  }
};

export const newToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new NotAuthorizedError();
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const user = verifyJwt(refreshToken, refreshSecret!) as JWTUserPayload;
    if (!user) {
      throw new ForbiddenError();
    }
    const payload: JWTUserPayload = {
      id: user.id,
      email: user.email,
    };
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const newAccessToken = generateJwtAccessToken(payload, accessSecret!);

    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, {
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log("Error in new token", error);
    next(error);
  }
};
