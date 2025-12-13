import express from 'express';
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
    .post(handleAddSweet)       // Add a new sweet
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
    .put(handleUpdateSweetById)     // Update sweet
    .delete(handleDeleteSweetById); // Delete sweet

/**
 * Business actions
 */
router.post('/:id/purchase', handlePurchaseSweet); // Purchase sweet
router.post('/:id/restock', handleRestockById);    // Restock sweet

export default router;
