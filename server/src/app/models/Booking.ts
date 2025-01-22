const bookingSchema = new mongoose.Schema({
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookingDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Booked', 'Cancelled'],
      default: 'Booked'
    },
  }, { timestamps: true });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  