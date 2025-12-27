const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const { name, postalAddress, mobileNumber, testimonialText } = req.body;

    const testimonial = new Testimonial({
      name,
      postalAddress,
      mobileNumber,
      testimonialText,
    });

    await testimonial.save();
    res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all testimonials (Admin only)
router.get('/admin/all', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Approve testimonial
router.patch('/:id/approve', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Testimonial approved',
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
