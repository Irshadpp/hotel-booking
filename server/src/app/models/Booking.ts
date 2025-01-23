import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBooking extends Document {
  hotel: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; 
  bookingDate: Date;
  status: 'Booked' | 'Cancelled'; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

const bookingSchema: Schema<IBooking> = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Booked', 'Cancelled'],
      default: 'Booked',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
