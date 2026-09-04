const Transport = require('../models/Transport');

exports.getTransports = async (req, res) => {
  try {
    const { district } = req.query;
    let query = {};
    if (district && district !== 'All') query.district = district;
    const list = await Transport.find(query).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createTransport = async (req, res) => {
  try {
    const { driverName, vehicleType, district, pricePerDay, contactPhone } = req.body;
    if (!driverName || !vehicleType || !contactPhone || pricePerDay === undefined) {
      return res.status(400).json({ error: 'All vehicle details are required' });
    }
    const newVehicle = new Transport(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};