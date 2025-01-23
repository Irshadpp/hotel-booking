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
      price: newHotel.price
    }
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
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 5; 

    const hotels = await hotelService.findHotels(page, limit);

    // Check if hotels exist
    if (!hotels.length) {
      return sendResponse(
        res,
        HttpStatusCode.NOT_FOUND,
        "No hotels found",
        []
      );
    }

    sendResponse(res, HttpStatusCode.OK, "Fetched Hotels successfully", {
      hotels,
      page,
      limit,
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
    const { date, page = 1, limit = 3 } = req.query;

  if (!date) {
    throw new BadRequestError("Date is required")
  }
  const hotels = await hotelService.getAvailableHotelsByDate(
    Number(page),
    Number(limit),
    date as string
  );

  if (hotels.length > 0) {
    return sendResponse(
      res,
      HttpStatusCode.OK,
      "Fetched available hotels successfully",
       { hotels,
        page: Number(page),
        limit: Number(limit),}
    );
  } else {
    return sendResponse(res, HttpStatusCode.NOT_FOUND, "No hotels found for the given date")
  }
  } catch (error) {
    console.log(error);
    next(error);
  }
};