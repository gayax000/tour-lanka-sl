const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  driverName: { 
    type: String, 
    required: [true, 'Driver or company name is required'], 
    trim: true 
  },
  vehicleType: { 
    type: String, 
    enum: ['Traditional Tuk-Tuk', 'Scooter / Motorbike', '4x4 Safari Jeep', 'Aircon Van'],
    required: [true, 'Vehicle type is required'] 
  },
  district: { 
    type: String, 
    required: [true, 'District is required'],
    default: 'Ella & Badulla'
  },
  pricePerDay: { 
    type: Number, 
    required: [true, 'Daily rental rate is required'], 
    min: [0, 'Rate cannot be negative'] 
  },
  contactPhone: { 
    type: String, 
    required: [true, 'Contact phone is required'], 
    trim: true 
  },
  availableStatus: { 
    type: String, 
    enum: ['Available', 'On Tour'], 
    default: 'Available' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);