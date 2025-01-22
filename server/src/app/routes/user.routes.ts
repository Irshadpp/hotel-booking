import express, { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { loginUserValidator } from "../validators/login-user.validator";
import { requireAuth } from "../middlewares/require-auth";

const router: Router = express.Router();

router.post("/login", loginUserValidator, validateRequest);
router.get("/new-token", requireAuth);

export { router as userRouter };
