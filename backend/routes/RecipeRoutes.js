import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

import asyncHandler from "../middleware/asyncHandler.js";
import Recipe from "../models/RecipeModel.js";
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import requireAuth from "../middleware/requireAuth.js";

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
    // console.log(id);

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
    // const test = recipe.author.toString();
    // console.log(test);
    const author = await Customer.findById(recipe.author);

    res.status(200).json({
        recipe: recipe,
        author: author
    });
}));


// needs to be authenticated to create new recipe
router.use(requireAuth);

// create new recipe route
router.post("/newrecipe", bodyParser.json(), asyncHandler(async (req, res) => {
    const user = req.user;
    const json = req.body;
    json.author = user._id;
    console.log(json);

    const recipe = new Recipe(json);
    console.log(recipe);
    let saveRecipe = await recipe.save();

    if (!saveRecipe) {
        res.status(400).json({ message: "Something went wrong. Please try again" });
        return;
    }

    res.status(200).json(recipe);
    console.log("Recipe created!");
}));

// add recipe to favourites
router.put("/", asyncHandler(async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.body.recipeID);
        const user = await User.findById(req.body.userID);
        user.favourites.push(recipe);
        await user.save();
        res.status(200).json({ favourites: user.favourites });
    } catch (err) {
        res.status(400).json(err);
    }
}));

// get favourite recipes ids
router.get("/favourites/ids", asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        res.json({ favourites: user?.favourites });
    } catch (err) {
        res.status(400).json(err);
    }
}));

router.get("/favourites", asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        const favourites = await Recipe.find({
            _id: { $in: user.favourites },
        });
        res.status(200).json({ favourites });
    } catch (err) {
        res.status(400).json(err);
    }
}));

export default router;