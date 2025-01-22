import express, { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { loginUserValidator } from "../validators/login-user.validator";
import { requireAuth } from "../middlewares/require-auth";
import { createUser, loginUser } from "../controllers/users.controller";
import { createUserValidator } from "../validators/create-user.validator";

const router: Router = express.Router();

router.post("/create", createUserValidator, validateRequest, createUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.get("/new-token", requireAuth);

export { router as userRouter };
