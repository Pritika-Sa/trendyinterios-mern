const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        console.log('Register Request Received:', { name, email });

        // Normalize & Sanitize
        if (email) email = email.toLowerCase().trim();
        if (name) name = name.trim();

        // Validate required fields
        if (!name) return res.status(400).json({ success: false, error: 'Name is required' });
        if (!email) return res.status(400).json({ success: false, error: 'Email is required' });
        if (!password) return res.status(400).json({ success: false, error: 'Password is required' });
        if (password.length < 6) return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });

        // 1. Manual Check
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('Conflict: User already found in manual check:', userExists._id);
            return res.status(400).json({
                success: false,
                error: `Email ${email} is already taken.`
            });
        }

        // 2. Create User (Role defaults to 'user' in schema)
        console.log('Attempting to create user in DB...');
        const user = await User.create({
            name,
            email,
            password
        });
        console.log('User created successfully:', user._id);

        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error('Register Critical Error:', err);

        // Duplicate Key Error (MongoDB Code 11000)
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const displayField = field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Field';
            const value = err.keyValue ? err.keyValue[field] : '';

            return res.status(400).json({
                success: false,
                error: `Database Error: ${displayField} '${value}' already exists (Mongo Constraint).`
            });
        }

        // Validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages.join(', ') });
        }

        // General Error
        return res.status(500).json({
            success: false,
            error: `Server Error: ${err.message}`
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        email = email.toLowerCase().trim();

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in user
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// Helper
const sendTokenResponse = (user, statusCode, res) => {
    // FALLBACK SECRET for dev/testing if .env is missing/unreadable
    const secret = process.env.JWT_SECRET || 'fallback_dev_secret_key_12345';

    if (!process.env.JWT_SECRET) {
        console.warn('WARNING: JWT_SECRET is not defined/readable. Using fallback secret.');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }
    });
};
