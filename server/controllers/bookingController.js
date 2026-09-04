const Booking = require('../models/Booking');

// 1. Get all bookings with optional status filter
exports.getBookings = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Create new Tourist Booking
exports.createBooking = async (req, res) => {
  try {
    const { touristName, touristEmail, touristPhone, guideOrService, district, bookingDate, numberOfDays, numberOfGuests, totalAmount } = req.body;

    if (!touristName || !touristName.trim()) return res.status(400).json({ error: 'Tourist name is required' });
    if (!touristEmail || !touristEmail.trim()) return res.status(400).json({ error: 'Email address is required' });
    if (!touristPhone || !touristPhone.trim()) return res.status(400).json({ error: 'Phone number is required' });
    if (!guideOrService || !guideOrService.trim()) return res.status(400).json({ error: 'Guide or service is required' });
    if (!bookingDate) return res.status(400).json({ error: 'Booking date is required' });
    if (!numberOfDays || numberOfDays < 1) return res.status(400).json({ error: 'Valid number of days required' });
    if (totalAmount === undefined || totalAmount < 0) return res.status(400).json({ error: 'Valid positive total amount required' });

    const newBooking = new Booking({
      touristName: touristName.trim(),
      touristEmail: touristEmail.trim().toLowerCase(),
      touristPhone: touristPhone.trim(),
      guideOrService: guideOrService.trim(),
      district: district || 'Ella & Badulla',
      bookingDate,
      numberOfDays: Number(numberOfDays),
      numberOfGuests: Number(numberOfGuests || 1),
      totalAmount: Number(totalAmount),
      status: 'Pending'
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update Booking Status (e.g. Pending -> Confirmed)
exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Booking record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete / Cancel Booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Booking record not found' });
    res.json({ message: 'Booking removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};