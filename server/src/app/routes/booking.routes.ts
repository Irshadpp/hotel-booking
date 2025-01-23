import express, { Router } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { createBooking, fetchBookings } from "../controllers/booking.controller";
import { validateRequest } from "../middlewares/validate-request";
import { createBookingValidator } from "../validators/create-booking.validator";


const router: Router = express.Router();

router.post("/", requireAuth, createBookingValidator, validateRequest, createBooking);
router.get("/", requireAuth, fetchBookings);

export { router as bookingRouter };
