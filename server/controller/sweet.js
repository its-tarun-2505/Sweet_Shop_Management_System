import Sweet from '../model/Sweet.js';
import mongoose from 'mongoose';
import { Response, ErrorResponse } from "../utils/response.js";

/**
 * @desc    Get all sweets
 * @route   GET /api/sweets
 * @access  Public
 */
const handleGetAllSweets = async (req, res) => {
    try {
        // Fetch all sweets from the database
        const sweets = await Sweet.find({}).lean();

        // If no sweets are found
        if (!sweets.length) {
            const error = new Error('No sweets available');
            error.statusCode = 404;
            throw error;
        }

        return Response(res, sweets, 200, 'Fetched sweets successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Add a new sweet
 * @route   POST /api/sweets
 * @access  Admin
 */
const handleAddSweet = async (req, res) => {
    try {
        const { name, category, price, quantity, unit } = req.body;

        // Basic input validation
        if (!name || !category || price == null || quantity == null) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }

        if (price <= 0 || quantity < 0) {
            const error = new Error("Invalid price or quantity");
            error.statusCode = 400;
            throw error;
        }

        // Create new sweet entry
        const sweetDoc = await Sweet.create({
            name,
            category,
            price,
            quantity,
            unit
        });

        const sweet = sweetDoc._doc;

        return Response(res, sweet, 201, 'Sweet added successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Delete sweet by ID
 * @route   DELETE /api/sweets/:id
 * @access  Admin
 */
const handleDeleteSweetById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid sweet ID');
            error.statusCode = 400;
            throw error;
        }

        const sweet = await Sweet.findByIdAndDelete(id);

        if (!sweet) {
            const error = new Error('Sweet does not exist');
            error.statusCode = 404;
            throw error;
        }

        return Response(res, {}, 200, 'Sweet deleted successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Search sweets by name, category or price range
 * @route   GET /api/sweets/search
 * @access  Public
 */
const handleSearchSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const sweets = await Sweet.find(query).lean();

        return Response(res, sweets, 200, 'Search results fetched successfully');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Update sweet details
 * @route   PUT /api/sweets/:id
 * @access  Admin
 */
const handleUpdateSweetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid sweet ID');
            error.statusCode = 400;
            throw error;
        }

        // Update sweet and return updated document
        const sweetDoc = await Sweet.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!sweetDoc) {
            const error = new Error('Sweet does not exist');
            error.statusCode = 404;
            throw error;
        }

        const sweet = sweetDoc._doc;

        return Response(res, sweet, 200, 'Sweet updated successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Restock sweet quantity
 * @route   POST /api/sweets/:id/restock
 * @access  Admin
 */
const handleRestockById = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error('Invalid sweet ID');
            error.statusCode = 400;
            throw error;
        }

        if (quantity < 0) {
            const error = new Error("Invalid quantity");
            error.statusCode = 400;
            throw error;
        }

        // Increment quantity instead of replacing it
        const sweetDoc = await Sweet.findByIdAndUpdate(
            id,
            { $inc: { quantity } },
            { new: true }
        );

        if (!sweetDoc) {
            const error = new Error('Sweet does not exist');
            error.statusCode = 404;
            throw error;
        }

        const sweet = sweetDoc._doc;
        return Response(res, sweet, 200, 'Sweet stock updated successfully!');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};

/**
 * @desc    Purchase sweet (reduce quantity)
 * @route   POST /api/sweets/:id/purchase
 * @access  Public
 */
const handlePurchaseSweet = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity <= 0) {
            const error = new Error('Purchase quantity must be greater than zero');
            error.statusCode = 400;
            throw error;
        }

        const sweetDoc = await Sweet.findById(req.params.id);

        if (!sweetDoc) {
            const error = new Error('Sweet not found');
            error.statusCode = 404;
            throw error;
        }

        if (sweetDoc.quantity < quantity) {
            const error = new Error('Insufficient stock');
            error.statusCode = 400;
            throw error;
        }

        sweetDoc.quantity -= quantity;
        await sweetDoc.save();

        const sweet = sweetDoc._doc;
        return Response(res, sweet, 200, 'Sweet purchased successfully');
    } catch (error) {
        return ErrorResponse(res, error);
    }
};


export {
    handleGetAllSweets,
    handleAddSweet, 
    handleDeleteSweetById,
    handleUpdateSweetById,
    handleSearchSweets,
    handleRestockById,
    handlePurchaseSweet
};
