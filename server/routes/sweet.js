import express from 'express';
import verifyAdmin from '../middleware/verifyAdminRole.js';
import {
    handleGetAllSweets,
    handleAddSweet,
    handleDeleteSweetById,
    handleUpdateSweetById,
    handleRestockById,
    handleSearchSweets,
    handlePurchaseSweet
} from '../controller/sweet.js';

const router = express.Router();

/**
 * Collection-level routes
 */
router
    .route('/')
    .post(verifyAdmin, handleAddSweet)       // Add a new sweet
    .get(handleGetAllSweets);   // Get all sweets

/**
 * Search route
 */
router.get('/search', handleSearchSweets);

/**
 * Individual sweet routes
 */
router
    .route('/:id')
    .put(verifyAdmin, handleUpdateSweetById)     // Update sweet
    .delete(verifyAdmin, handleDeleteSweetById); // Delete sweet

/**
 * Business actions
 */
router.post('/:id/purchase', handlePurchaseSweet); // Purchase sweet
router.post('/:id/restock', verifyAdmin, handleRestockById);    // Restock sweet

export default router;
