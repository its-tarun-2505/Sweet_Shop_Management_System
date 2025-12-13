import mongoose from "mongoose";

// Sweet schema
const SweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    unit: {
      type: String,
      enum: ['kg', 'box', 'piece'],
      default: 'kg',
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 1
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      max: 5000
    },

    description: {
      type: String,
      trim: true
    },

    image: {
      type: [String] // image URLs
    }
  },
  {
    timestamps: true
  }
);

// Create Sweet model
const SweetModel = mongoose.model('sweet', SweetSchema);

export default SweetModel;
