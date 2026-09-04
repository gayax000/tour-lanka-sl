const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  touristName: { 
    type: String, 
    required: [true, 'Tourist name is required'], 
    trim: true 
  },
  touristEmail: { 
    type: String, 
    required: [true, 'Email is required'], 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  touristPhone: { 
    type: String, 
    required: [true, 'Phone number is required'], 
    trim: true 
  },
  guideOrService: { 
    type: String, 
    required: [true, 'Guide or service name is required'], 
    trim: true 
  },
  district: { 
    type: String, 
    required: [true, 'District is required'],
    default: 'Ella & Badulla'
  },
  bookingDate: { 
    type: String, 
    required: [true, 'Booking date is required'] 
  },
  numberOfDays: { 
    type: Number, 
    required: [true, 'Number of days is required'], 
    min: [1, 'At least 1 day is required'] 
  },
  numberOfGuests: { 
    type: Number, 
    required: [true, 'Number of guests is required'], 
    min: [1, 'At least 1 guest is required'] 
  },
  totalAmount: { 
    type: Number, 
    required: [true, 'Total amount is required'], 
    min: [0, 'Total amount cannot be negative'] 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);