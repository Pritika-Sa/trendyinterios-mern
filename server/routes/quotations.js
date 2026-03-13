const express = require('express');
const { generateQuotation } = require('../controllers/quotationController');

const router = express.Router();

// Generate quotation based on user requirements
router.post('/generate', generateQuotation);

module.exports = router;
