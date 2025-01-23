import { NextFunction, Request, Response } from "express";
import { BadRequestError, ForbiddenError, NotAuthorizedError } from "../errors";
import { HttpStatusCode, sendResponse } from "../utils/send-response";
import hotelService from "../services/hotel.service";

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHotel = await hotelService.createHotel(req.body);
    const hotelData = {
      id: newHotel.id,
      name: newHotel.name,
      location: newHotel.location,
      price: newHotel.price,
    };
    sendResponse(res, HttpStatusCode.CREATED, "Created Hotel successfully", {
      ...hotelData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const fetchAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await hotelService.findHotels();

    // Check if hotels exist
    if (!hotels.length) {
      return sendResponse(res, HttpStatusCode.NOT_FOUND, "No hotels found", []);
    }

    sendResponse(res, HttpStatusCode.OK, "Fetched Hotels successfully", {
      hotels,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const fetchAvailableHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;
    console.log(date, "ddddddddaaaaaaaaaatttttttttteeeeeeeeeeeeee");

    if (!date) {
      throw new BadRequestError("Date is required");
    }
    const hotels = await hotelService.getAvailableHotelsByDate(date as string);

    if (hotels.length > 0) {
      return sendResponse(
        res,
        HttpStatusCode.OK,
        "Fetched available hotels successfully",
        {hotels} 
      );
    } else {
      return sendResponse(
        res,
        HttpStatusCode.NOT_FOUND,
        "No hotels found for the given date"
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
