const express = require('express');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/authMiddleware');
const sendAdminEmail = require('../utils/mail');
const router = express.Router();

// Create contact
// Create contact (only for registered & verified users)
router.post('/', protect, async (req, res) => {
  try {
    const { purpose, mobileNumber, message } = req.body;
    const user = req.user;
    if (!user || !user.isVerified) {
      return res.status(403).json({ success: false, message: 'Email not verified' });
    }

    const contact = new Contact({
      name: user.name || user.email,
      email: user.email,
      purpose,
      mobileNumber,
      message,
    });

    await contact.save();

    // send admin email (async)
    sendAdminEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New contact from ${user.email}`,
      text: `${message}\n\nFrom: ${user.email} (${user.name || 'N/A'})`,
    }).catch(() => {});

    // notify admin UI via socket
    req.app.get('io')?.emit('admin:newContact', { id: contact._id, email: contact.email, createdAt: contact.createdAt });

    res.status(201).json({ success: true, message: 'Contact form submitted successfully', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all contacts (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single contact (Admin only)
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
