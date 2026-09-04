const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/transports', require('./routes/transportRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.get('/', (req, res) => res.json({ message: 'Welcome to TourLanka SL Eco-Tourism API!' }));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} - server.js:24`));