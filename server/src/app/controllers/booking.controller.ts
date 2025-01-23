import { NextFunction, Request, Response } from "express";
import bookingService from "../services/booking.service";
import { HttpStatusCode, sendResponse } from "../utils/send-response";
import hotelService from "../services/hotel.service";
import { BadRequestError, NotFoundError } from "../errors";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hotel: hotelId, bookingDate } = req.body;

    const hotel = await hotelService.findHotelById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    const conflictingBookings = await bookingService.findBookingsByHotelAndDate(
      hotelId,
      bookingDate
    );
    if (conflictingBookings.length > 0) {
      throw new BadRequestError("Hotel is already booked on the selected date");
    }

    const newBooking = await bookingService.createBooking({
      ...req.body,
      user: req.user?.id!,
    });
    console.log(newBooking);
    sendResponse(res, HttpStatusCode.CREATED, "Created Booking successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const fetchBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingsData = await bookingService.findBookingsByUserId(req.user?.id!);
    sendResponse(res, HttpStatusCode.OK, "Fetched Bookings successfully", {bookings:bookingsData});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
