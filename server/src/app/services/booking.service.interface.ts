import { IBooking } from "../models/Booking";

export interface IBookingService {
  createBooking(bookingData: Partial<IBooking>): Promise<IBooking>;
  findBookingsByUserId(userId: string): Promise<IBooking[]>;
}
