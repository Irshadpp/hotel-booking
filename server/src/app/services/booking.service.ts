import Booking, { IBooking } from "../models/Booking";
import { IBookingService } from "./booking.service.interface";

class BookingService implements IBookingService {
  async createBooking(bookingData: Partial<IBooking>): Promise<IBooking> {
    try {
      const newBooking = new Booking(bookingData);
      await newBooking.save();
      return newBooking;
    } catch (error: any) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
  }

  async findBookingsByUserId(userId: string): Promise<IBooking[]> {
    try {
        const bookings = await Booking.find({ user: userId })
          .populate("hotel", "id name location price")
          .select("id hotel user bookingDate status createdAt updatedAt");
        return bookings;
      } catch (error: any) {
        throw new Error(`Error fetching bookings: ${error.message}`);
      }
  }

 async findBookingsByHotelAndDate(hotelId: string, date: Date): Promise<IBooking[]> {
    return await Booking.find({
      hotel: hotelId,
      bookingDate: {
        $gte: new Date(date).setHours(0, 0, 0, 0), // Start of the day
        $lt: new Date(date).setHours(23, 59, 59, 999), // End of the day
      },
    });
  }
}

const bookingService = new BookingService();
export default bookingService;
