const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true, // Optional description for the category
    default: ''
  },
  slug: {
    type: String, // A unique slug for SEO-friendly category URLs
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  image: {
    type: String, // URL to an image or icon representing the category
    default: ''
  },
  popularity: {
    type: Number, // Popularity score for sorting or ranking categories
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
