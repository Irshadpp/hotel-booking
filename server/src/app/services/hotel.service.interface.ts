import { IHotel } from "../models/Hotel";

export interface IHotelService {
  createHotel(hotelData: Partial<IHotel>): Promise<IHotel>;
  findHotelById(id: number): Promise<IHotel | null>;
  findHotels(page: number, limit: number): Promise<IHotel[]>;
}
