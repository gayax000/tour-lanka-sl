const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Full name is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email address is required'], 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: { 
    type: String, 
    enum: ['tourist', 'admin'], 
    default: 'tourist' 
  },
  district: { 
    type: String, 
    default: 'Ella & Badulla' 
  },
  contactPhone: { 
    type: String, 
    default: '' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);