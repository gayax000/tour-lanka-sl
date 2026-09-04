const User = require('../models/User');

// 1. User / Provider Registration
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, district, contactPhone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || 'tourist',
      district: district || 'Ella & Badulla',
      contactPhone: contactPhone ? contactPhone.trim() : ''
    });

    await newUser.save();
    
    // Return sanitized user object
    const userRes = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      district: newUser.district,
      contactPhone: newUser.contactPhone
    };

    res.status(201).json({ message: 'Registration successful!', user: userRes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 2. User / Provider Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase(), password });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const userRes = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      district: user.district,
      contactPhone: user.contactPhone
    };

    res.json({ message: 'Login successful!', user: userRes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};