import express, { Router } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { createBooking, fetchBookings } from "../controllers/booking.controller";
import { validateRequest } from "../middlewares/validate-request";


const router: Router = express.Router();

router.post("/", requireAuth, createBooking, validateRequest, createBooking);
router.get("/", requireAuth, fetchBookings);

export { router as bookingRouter };
