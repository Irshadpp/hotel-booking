const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
