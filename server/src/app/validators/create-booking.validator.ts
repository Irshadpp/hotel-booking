import { body } from "express-validator";

export const createBookingValidator = [
  body("hotel")
    .trim()
    .notEmpty()
    .withMessage("Hotel ID is required")
    .isMongoId()
    .withMessage("Invalid Hotel ID format"),
  body("bookingDate")
    .notEmpty()
    .withMessage("Booking date is required")
    .isISO8601()
    .toDate()
    .withMessage("Booking date must be a valid ISO 8601 date")
    .custom((value: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (value < today) {
        throw new Error("Booking date cannot be in the past");
      }
      return true;
    }),
];
