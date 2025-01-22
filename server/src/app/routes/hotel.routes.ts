import express, { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { requireAuth } from "../middlewares/require-auth";
import { createHotel, fetchAllHotels } from "../controllers/hotel.controller";
import { createHotelValidator } from "../validators/create-hotel.validator";

const router: Router = express.Router();

router.post("/", createHotelValidator, validateRequest, createHotel); //ToDo: can have admin authorization here
router.get("/", requireAuth, fetchAllHotels);

export { router as hotelRouter };
