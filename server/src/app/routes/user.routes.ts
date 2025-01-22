import express, { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { loginUserValidator } from "../validators/login-user.validator";
import { createUser, loginUser, newToken } from "../controllers/users.controller";
import { createUserValidator } from "../validators/create-user.validator";

const router: Router = express.Router();

router.post("/create", createUserValidator, validateRequest, createUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.get("/new-token", newToken);

export { router as userRouter };
