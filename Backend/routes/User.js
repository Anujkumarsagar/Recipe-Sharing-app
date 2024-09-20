const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
    createRecipes,
    updateProfile,
    deleteProfile,
    getUserProfile,
    getUserRecipes,
    addToFavorites
} = require("../controllers/User");

// Create a new recipe
router.post("/create-recipe", auth, createRecipes);

// Update user profile
router.put("/update-profile", auth, updateProfile);

// Delete user profile
router.delete("/delete-profile", auth, deleteProfile);

// Get user profile
router.get("/profile/:userId?", auth, getUserProfile);

// Get user recipes
router.get("/recipes/:userId?", auth, getUserRecipes);

// Add recipe to favorites
router.post("/add-favorite", auth, addToFavorites);

module.exports = router;
