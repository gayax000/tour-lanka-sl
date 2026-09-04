const Guide = require('../models/Guide');

// 1. Get all guides & listings with Search & Filter
exports.getGuides = async (req, res) => {
  try {
    const { district, providerType, search } = req.query;
    let query = {};

    if (district && district !== 'All') {
      query.district = district;
    }
    if (providerType && providerType !== 'All') {
      query.providerType = providerType;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { languages: { $regex: search, $options: 'i' } }
      ];
    }

    const guides = await Guide.find(query).sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Add new Guide / Service Listing
exports.createGuide = async (req, res) => {
  try {
    const { name, providerType, district, category, languages, pricePerDay, contactEmail, bio, experienceTags } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ error: 'Guide/Service name is required' });
    if (!category) return res.status(400).json({ error: 'Category is required' });
    if (!languages || !languages.trim()) return res.status(400).json({ error: 'Languages are required' });
    if (pricePerDay === undefined || pricePerDay < 0) return res.status(400).json({ error: 'Valid positive daily price is required' });
    if (!contactEmail || !contactEmail.trim()) return res.status(400).json({ error: 'Contact email is required' });
    if (!bio || !bio.trim()) return res.status(400).json({ error: 'Description is required' });

    const newGuide = new Guide({
      name: name.trim(),
      providerType: providerType || 'Local Guide',
      district: district || 'Ella & Badulla',
      category,
      languages: languages.trim(),
      pricePerDay: Number(pricePerDay),
      contactEmail: contactEmail.trim().toLowerCase(),
      bio: bio.trim(),
      experienceTags: Array.isArray(experienceTags) && experienceTags.length > 0 
        ? experienceTags 
        : ['🌿 Eco Tourism', '🍛 Local Culture']
    });

    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update Guide Listing
exports.updateGuide = async (req, res) => {
  try {
    if (req.body.pricePerDay !== undefined && req.body.pricePerDay < 0) {
      return res.status(400).json({ error: 'Price per day cannot be negative' });
    }
    const updated = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Guide listing not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete Guide Listing
exports.deleteGuide = async (req, res) => {
  try {
    const deleted = await Guide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Guide listing not found' });
    res.json({ message: 'Guide profile removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};