const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  touristName: { 
    type: String, 
    required: [true, 'Tourist name is required'], 
    trim: true 
  },
  tourOrGuide: { 
    type: String, 
    required: [true, 'Service or guide name is required'], 
    trim: true 
  },
  rating: { 
    type: Number, 
    required: [true, 'Rating is required'], 
    min: [1, 'Minimum rating is 1'], 
    max: [5, 'Maximum rating is 5'] 
  },
  comment: { 
    type: String, 
    required: [true, 'Review comment is required'], 
    trim: true 
  },
  recommend: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);