const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// Get driver profile
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select('-password');
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update online status
router.patch('/:id/status', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.isOnline = req.body.isOnline;
    driver.isAvailable = req.body.isOnline; // When going offline, also set as unavailable
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register new driver
router.post('/register', async (req, res) => {
  const driver = new Driver({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // In a real app, hash this password
    phoneNumber: req.body.phoneNumber,
    vehicleInfo: {
      type: req.body.vehicleType,
      plateNumber: req.body.plateNumber
    }
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login driver
router.post('/login', async (req, res) => {
  try {
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) {
      return res.status(400).json({ message: 'Driver not found' });
    }

    // In a real app, compare hashed passwords
    if (req.body.password !== driver.password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({
      id: driver._id,
      name: driver.name,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
      isOnline: driver.isOnline,
      isAvailable: driver.isAvailable,
      vehicleInfo: driver.vehicleInfo,
      rating: driver.rating,
      totalDeliveries: driver.totalDeliveries
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update driver availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.isAvailable = req.body.isAvailable;
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update driver rating
router.patch('/:id/rating', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.rating = ((driver.rating * driver.totalDeliveries) + req.body.rating) / (driver.totalDeliveries + 1);
    driver.totalDeliveries += 1;
    
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 