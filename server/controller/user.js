import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { Response, ErrorResponse } from '../utils/response.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const handleRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        // Prevents duplicate accounts
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 400;
            throw error;
        }

        // Create user (password hashing handled by model middleware)
        const user = await User.create({ name, email, password, role });

        // Minimal payload for token generation
        const payload = {
            id: user._id,
            role: user.role
        };

        // Generate JWT token
        const token = generateToken(payload);

        return Response(res, { token }, 201, 'Registered successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Verify email exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error(`Email Id doesn't exist`);
            error.statusCode = 401;
            throw error;
        }

        // Step 2: Verify password
        // bcrypt compares plain password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Step 3: Prepare token payload
        const payload = {
            id: user._id,
            role: user.role
        };

        // Step 4: Generate JWT token
        const token = generateToken(payload);

        return Response(res, { token }, 200, 'Login successful!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const handleGetCurrentUser = async (req, res) => {
    try {
        // req.user.id comes from JWT middleware
        const user = await User
            .findById(req.user.id)
            .select('-password')
            .lean();

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return Response(res, user, 200, 'User fetched successfully');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

export {
    handleRegister,
    handleLogin,
    handleGetCurrentUser
};
