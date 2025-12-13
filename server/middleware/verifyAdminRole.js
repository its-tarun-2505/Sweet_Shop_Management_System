import { ErrorResponse } from "../utils/response.js";

/**
 * @desc    Verify admin role
 * @usage   Use after auth (protect) middleware
 * @access  Admin only
 */
const verifyAdmin = (req, res, next) => {
    try {
        // `protect` middleware must attach user to req
        if (!req.user || req.user.role !== 'admin') {
            const error = new Error('Access denied: Admin privileges required');
            error.statusCode = 403; // Forbidden (better than 401 here)
            throw error;
        }

        // User is admin → allow request to continue
        next();
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

export default verifyAdmin;
