const mongoose = require("mongoose")

mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""

    },
    location: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    contactNumber: {
        type: String,
        default: ""
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    favoriteRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    accountType: {
        type: String,
        enum: ["visitor", "creator"],
        default: "visitor"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },



})