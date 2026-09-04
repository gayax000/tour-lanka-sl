const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const Guide = require('../models/Guide');
const Booking = require('../models/Booking');
const Transport = require('../models/Transport');
const Review = require('../models/Review');
const User = require('../models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tourlankaDB');
    console.log('Connected to MongoDB for Seeding...');

    await Promise.all([
      Guide.deleteMany({}),
      Booking.deleteMany({}),
      Transport.deleteMany({}),
      Review.deleteMany({}),
      User.deleteMany({})
    ]);

    // 1. Seed Guides
    const guides = await Guide.insertMany([
      {
        name: 'Suneth Perera',
        providerType: 'Local Guide',
        district: 'Ella & Badulla',
        category: 'Hiking & Nature',
        languages: 'English, German, Sinhala',
        pricePerDay: 6000,
        contactEmail: 'suneth.ella@tourlanka.lk',
        bio: 'Local Ella native with 8+ years experience guiding tourists to Ella Rock, Nine Arch, and hidden waterfalls.',
        experienceTags: ['🌿 Eco Tourism', '🏔️ Hiking & Adventure']
      },
      {
        name: 'Kamal Dissanayake',
        providerType: 'Local Guide',
        district: 'Sigiriya & Dambulla',
        category: 'Cultural & Heritage',
        languages: 'English, French, Sinhala',
        pricePerDay: 5500,
        contactEmail: 'kamal.sigiriya@tourlanka.lk',
        bio: 'Heritage specialist offering guided historical tours of Sigiriya Rock Fortress and Pidurangala sunset treks.',
        experienceTags: ['🍛 Local Culture & Food', '🏛️ Heritage']
      },
      {
        name: 'Nalin Fernando',
        providerType: 'Village Homestay',
        district: 'Mirissa & Galle',
        category: 'Culinary & Village Tour',
        languages: 'English, Sinhala',
        pricePerDay: 4500,
        contactEmail: 'nalin.mirissa@tourlanka.lk',
        bio: 'Offers authentic village home meals, coconut harvesting demos, and Southern coastal tour guidance.',
        experienceTags: ['🌿 Eco Tourism', '🍛 Local Culture & Food']
      }
    ]);

    // 2. Seed Transports
    await Transport.insertMany([
      {
        driverName: 'Saman Kumara (Tuk-Tuk)',
        vehicleType: 'Traditional Tuk-Tuk',
        district: 'Ella & Badulla',
        pricePerDay: 3500,
        contactPhone: '0771234567',
        availableStatus: 'Available'
      },
      {
        driverName: 'Rohan Safari Jeeps',
        vehicleType: '4x4 Safari Jeep',
        district: 'Yala & Tissamaharama',
        pricePerDay: 12000,
        contactPhone: '0719876543',
        availableStatus: 'Available'
      }
    ]);

    // 3. Seed Bookings
    await Booking.insertMany([
      {
        touristName: 'John Smith',
        touristEmail: 'john@traveler.com',
        touristPhone: '0778889900',
        guideOrService: 'Suneth Perera (Ella Hiking)',
        district: 'Ella & Badulla',
        bookingDate: '2026-09-10',
        numberOfDays: 2,
        numberOfGuests: 2,
        totalAmount: 12000,
        status: 'Confirmed'
      }
    ]);

    // 4. Seed Reviews
    await Review.insertMany([
      {
        touristName: 'Emma Watson',
        tourOrGuide: 'Suneth Perera (Ella Guide)',
        rating: 5,
        comment: 'Suneth was an incredible eco guide! Showed us secret viewpoints in Ella away from crowds.',
        recommend: true
      }
    ]);

    console.log('✅ Sample Data Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Error:', err.message);
    process.exit(1);
  }
};

seedData();