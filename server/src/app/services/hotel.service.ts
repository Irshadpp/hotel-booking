import { IHotel } from '../models/Hotel';
import Hotel from '../models/Hotel'; 
import { IHotelService } from './hotel.service.interface';

export class HotelService implements IHotelService {
  async createHotel(hotelData: Partial<IHotel>): Promise<IHotel> {
    try {
      const newHotel = new Hotel(hotelData);
      return await newHotel.save();
    } catch (error: any) {
      throw new Error(`Error creating hotel: ${error.message}`);
    }
  }

  async findHotelById(id: number): Promise<IHotel | null> {
    try {
      const hotel = await Hotel.findById(id);
      return hotel;
    } catch (error:any) {
      throw new Error(`Error finding hotel by ID: ${error.message}`);
    }
  }

  async findHotels(): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find()
      return hotels;
    } catch (error: any) {
      throw new Error(`Error finding hotels: ${error.message}`);
    }
  }

  async getAvailableHotelsByDate(
    date: string
  ): Promise<IHotel[]> {
    const targetDate = new Date(date);

    const availableHotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "hotel",
          as: "bookings",
        },
      },
      {
        $addFields: {
          isBookedOnDate: {
            $in: [targetDate, { $map: { input: "$bookings.bookingDate", as: "bookingDate", in: { $toDate: "$$bookingDate" } } }],
          },
        },
      },
      {
        $match: { isBookedOnDate: { $eq: false } }, 
      },
      {
        $project: {
          id: "$_id",
          name: 1,
          location: 1, 
          price: 1,
          _id: 0
        },
      },
    ]);

    return availableHotels;
  }
}

export default new HotelService();