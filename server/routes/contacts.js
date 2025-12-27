const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, purpose, mobileNumber, message } = req.body;

    const contact = new Contact({
      name,
      email,
      purpose,
      mobileNumber,
      message,
    });

    await contact.save();
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all contacts (Admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
