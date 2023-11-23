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


router.get("/getrecipe", asyncHandler(async (req, res) => {
    const keyword = req.query.keyword;
    const recipe = await Recipe.find({
        $or: [{ title: { $regex: "(?i)" + keyword } },
        { tag: { $regex: "(?i)" + keyword } }]
    });
    res.status(200).json(recipe);
}));

// get single recipe
router.get("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("recipe id: " + id);

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
router.post("/newrecipe", asyncHandler(async (req, res) => {
    const user = req.user;
    const json = req.body;
    json.author = user.customer;
    console.log(json);

    const recipe = new Recipe(json);
    console.log(recipe);
    try {
        let saveRecipe = await recipe.save();
        if (!saveRecipe) {
            res.status(400).json({ message: "Something went wrong. Please try again" });
            return;
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again" });
        return;
    }

    res.status(200).json(recipe);
    console.log("Recipe created!");
}));

router.get("/my/recipes", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("my recipes");
    try {
        const user = req.user.customer;
        const recipes = await Recipe.find({ author: { $in: user } });
        console.log("recipes------------------");
        console.log(recipes);
        res.status(200).json({ recipes });
    } catch (err) {
        res.status(400).json(err);
    }
}));

router.post("/edit/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("recipe edit");
    try {
        console.log(req.body);
        const updated = req.body;
        await Recipe.findByIdAndUpdate(updated._id, updated);
        res.status(200).json("Recipe successfully updated.");
    } catch (err) {
        console.warn(err);
        res.status(400).json(err);
    }
}));

router.delete("/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("removing recipes ------");
    const { id } = req.params;
    try {
        await Recipe.deleteOne({ _id: id });
        res.status(200).json("Recipe successfully removed.");
    } catch (err) {
        res.status(400).json(err);
    }
    console.log(id);
}));

// add recipe to favourites
router.post("/favourites", bodyParser.json(), asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const id = req.body.recipeID;
        const index = user.favourites.findIndex((fav) => fav == id);
        if (index > -1) {
            user.favourites.splice(index, 1);
        } else {
            user.favourites.push(id);
        }
        await user.save();
        res.status(200).json({ favourites: user.favourites });
    } catch (err) {
        res.status(400).json(err);
    }
}));

// get favourite recipes ids
router.get("/favourites/ids", asyncHandler(async (req, res) => {
    console.log("test 1");
    try {
        const user = req.user;
        res.json({ favourites: user?.favourites });
    } catch (err) {
        res.status(400).json(err);
    }
}));

router.get("/favourites/recipes", asyncHandler(async (req, res) => {
    console.log("test 2");
    try {
        const user = req.user;
        const favouriteRecipes = await Recipe.find({
            _id: { $in: user.favourites },
        });
        console.log(favouriteRecipes);
        res.status(200).json({ favouriteRecipes: favouriteRecipes });
    } catch (err) {
        res.status(400).json(err);
    }
}));

router.post("/add-review", asyncHandler(async (req, res) => {
    const { rating, comment, recipeId } = req.body;
    const custID = req.user.customer;
    try {
        const name = await Customer.findById(custID);
        const recipe = await Recipe.findById(recipeId);
        const fullname = name.firstName + " " + name.lastName;
        const review = {
            user: req.user._id,
            name: fullname,
            rating: rating,
            comment: comment
        };
        console.log(recipe);
        if (recipe.review == null) {
            recipe.review = [];
        }
        recipe.review.push(review);
        recipe.save();
        res.status(200);
    } catch (err) {
        console.warn(err);
        res.status(400).json(err);
    }



}));


export default router;