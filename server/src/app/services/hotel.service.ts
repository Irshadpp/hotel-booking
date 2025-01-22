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

  async findHotels(page: number, limit: number): Promise<IHotel[]> {
    try {
      const skip = (page - 1) * limit;
      const hotels = await Hotel.find()
        .skip(skip)
        .limit(limit);
      return hotels;
    } catch (error: any) {
      throw new Error(`Error finding hotels: ${error.message}`);
    }
  }
}

export default new HotelService();