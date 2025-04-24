const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Get all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get driver's current delivery
router.get('/current/:driverId', async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      driver: req.params.driverId,
      status: { $in: ['pending', 'in_progress'] }
    });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new delivery
router.post('/', async (req, res) => {
  const delivery = new Delivery({
    pickupLocation: req.body.pickupLocation,
    dropoffLocation: req.body.dropoffLocation,
    packageType: req.body.packageType,
    estimatedTime: req.body.estimatedTime,
    driver: req.body.driverId
  });

  try {
    const newDelivery = await delivery.save();
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update delivery status
router.patch('/:id/status', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    delivery.status = req.body.status;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get driver's delivery history
router.get('/history/:driverId', async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      driver: req.params.driverId,
      status: { $in: ['completed', 'cancelled'] }
    }).sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 