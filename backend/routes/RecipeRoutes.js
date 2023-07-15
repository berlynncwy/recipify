import express from "express";
import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";
import Recipe from "../models/RecipeModel.js";

const router = express.Router();

// get all recipes
router.get("/", asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({});
    if (!recipes) {
        res.status(404).json("No product found");
        return;
    }
    res.status(200).json(recipes);
}));

// get single recipe
router.get("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    // if invalid recipe id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Invalid recipe ID" });
        return;
    }
    const recipe = await Recipe.findById(req.params.id);
    // if no recipe found
    if (!recipe) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    res.status(200).json(recipe);
}));

export default router;