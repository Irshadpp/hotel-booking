import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IHotel extends Document {
  name: string;
  location: string;
  price: number;
}

const hotelSchema: Schema<IHotel> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
);

const Hotel: Model<IHotel> = mongoose.model<IHotel>('Hotel', hotelSchema);

export default Hotel;
