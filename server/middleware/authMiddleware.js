import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../utils/response.js';

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Token must exist and follow "Bearer <token>" format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('Not authorized, token missing');
            error.statusCode = 401;
            throw error;
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error) {
        return ErrorResponse(res, error, 401);
    }
};

export default protect;
