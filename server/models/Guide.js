const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Guide or service name is required'], 
    trim: true 
  },
  providerType: { 
    type: String, 
    enum: ['Local Guide', 'Tuk-Tuk Driver', 'Village Homestay'],
    default: 'Local Guide'
  },
  district: { 
    type: String, 
    required: [true, 'District / Region is required'],
    enum: ['Ella & Badulla', 'Sigiriya & Dambulla', 'Mirissa & Galle', 'Kandy & Nuwara Eliya', 'Yala & Tissamaharama', 'Colombo & Negombo'],
    default: 'Ella & Badulla'
  },
  category: { 
    type: String, 
    enum: ['Hiking & Nature', 'Cultural & Heritage', 'Wildlife Safari', 'Surfing & Beach', 'Culinary & Village Tour'],
    required: [true, 'Category is required'] 
  },
  languages: { 
    type: String, 
    required: [true, 'Languages spoken are required'],
    trim: true 
  },
  pricePerDay: { 
    type: Number, 
    required: [true, 'Daily fee is required'], 
    min: [0, 'Fee cannot be negative'] 
  },
  contactEmail: { 
    type: String, 
    required: [true, 'Contact email is required'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  bio: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true 
  },
  experienceTags: {
    type: [String],
    default: ['🌿 Eco Tourism', '🍛 Local Culture', '🏞️ Authentic Experience']
  }
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);