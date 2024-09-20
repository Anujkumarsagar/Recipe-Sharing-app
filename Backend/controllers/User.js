const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require("../models/User");
const uploadImageToCloudinary = require('../utils/imageUploader');

exports.createRecipes = async (req, res) => {
    try {
        let { title, description, ingredients, instructions, category } = req.body;
        const image = req.files?.image;

        if (!title || !description || !ingredients || !instructions || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        category = category.trim();
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImageToCloudinary(image, "Recipes");
            if (!imageUrl) {
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }

        const newRecipe = new Recipe({
            title,
            description,
            ingredients: ingredients.split(","),
            instructions: instructions.split(","),
            category,
            author: req.user._id,
            image: imageUrl.secure_url
        });

        await newRecipe.save();

        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { recipes: newRecipe._id } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Recipe created successfully",
            recipe: newRecipe,
            user: user
        });

    } catch (error) {
        console.error("Error creating recipe:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the recipe",
            error: error.message
        });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        let { title, description, ingredients, instructions, category } = req.body;
        const image = req.files?.image;

        if (!title || !description || !ingredients || !instructions || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        category = category.trim();
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        recipe.title = title;
        recipe.description = description;
        recipe.ingredients = ingredients.split(",");
        recipe.instructions = instructions.split(",");
        recipe.category = category;

        if (image) {
            const imageUrl = await uploadImageToCloudinary(image, "Recipes");
            if (imageUrl && imageUrl.secure_url) {
                recipe.image = imageUrl.secure_url;
            }
        }

        await recipe.save();

        res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            recipe
        });
    } catch (error) {
        console.error("Error updating recipe:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the recipe",
            error: error.message
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User Id is not found"
            });
        }

        const user = await User.findOne({ _id: userId }).populate("recipes");

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in get Profile Controller",
            error: error.message,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { userName, email, bio, location, contactNumber } = req.body;
        const profilePic = req.files?.profilePic;

        if (!userName || !email || !bio || !location || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.userName = userName;
        user.email = email;
        user.bio = bio;
        user.location = location;
        user.contactNumber = contactNumber;

        if (profilePic) {
            const result = await uploadImageToCloudinary(profilePic, "ProfilePictures");
            if (result && result.secure_url) {
                user.profilePic = result.secure_url;
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: user
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the profile",
            error: error.message
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await Recipe.deleteMany({ author: userId });

        await User.updateMany(
            { favoriteRecipes: { $in: [userId] } },
            { $pull: { favoriteRecipes: userId } }
        );

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: "Profile and associated data deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the profile",
            error: error.message
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;

        const user = await User.findById(userId).select('-password -token');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user profile",
            error: error.message
        });
    }
};

exports.getUserRecipes = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;

        const recipes = await Recipe.find({ author: userId });

        res.status(200).json({
            success: true,
            recipes: recipes
        });
    } catch (error) {
        console.error("Error fetching user recipes:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user recipes",
            error: error.message
        });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.favoriteRecipes.includes(recipeId)) {
            return res.status(400).json({
                success: false,
                message: "Recipe already in favorites"
            });
        }

        user.favoriteRecipes.push(recipeId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Recipe added to favorites successfully"
        });
    } catch (error) {
        console.error("Error adding recipe to favorites:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding recipe to favorites",
            error: error.message
        });
    }
};

exports.removeFromFavorites = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const index = user.favoriteRecipes.indexOf(recipeId);
        if (index > -1) {
            user.favoriteRecipes.splice(index, 1);
            await user.save();
            res.status(200).json({
                success: true,
                message: "Recipe removed from favorites successfully"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Recipe not found in favorites"
            });
        }
    } catch (error) {
        console.error("Error removing recipe from favorites:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while removing recipe from favorites",
            error: error.message
        });
    }
};


