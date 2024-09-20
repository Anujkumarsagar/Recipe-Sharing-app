const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { recipeId } = req.params;
        const userId = req.user._id;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required"
            });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        const newComment = new Comment({
            content,
            author: userId,
            recipe: recipeId
        });

        await newComment.save();

        await Recipe.findByIdAndUpdate(recipeId, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({
            success: true,
            data: newComment
        });
    } catch (error) {
        console.error('Error in createComment:', error);
        res.status(500).json({
            success: false,
            message: "Error creating comment",
            error: error.message
        });
    }
};

exports.getCommentsByRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const comments = await Comment.find({ recipe: recipeId }).populate('author', 'name');

        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (error) {
        console.error('Error in getCommentsByRecipe:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching comments",
            error: error.message
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this comment"
            });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        console.error('Error in updateComment:', error);
        res.status(500).json({
            success: false,
            message: "Error updating comment",
            error: error.message
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        await Comment.findByIdAndDelete(commentId);

        await Recipe.findByIdAndUpdate(comment.recipe, {
            $pull: { comments: commentId }
        });

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.error('Error in deleteComment:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};
