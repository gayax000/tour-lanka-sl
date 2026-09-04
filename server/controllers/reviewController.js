const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createReview = async (req, res) => {
  try {
    const { touristName, tourOrGuide, rating, comment } = req.body;
    if (!touristName || !tourOrGuide || !rating || !comment) {
      return res.status(400).json({ error: 'All review fields are required' });
    }
    const newRev = new Review(req.body);
    await newRev.save();
    res.status(201).json(newRev);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};