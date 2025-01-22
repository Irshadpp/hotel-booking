import mongoose, { Document, Schema, Model } from 'mongoose';
export interface IUser extends Document {
  email: string;
  password: string;
  bookingHistory: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
