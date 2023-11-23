import express from "express";
import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import Recipe from "../models/RecipeModel.js";
import bodyParser from "body-parser";

const router = express.Router();

// get all products
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (!products) {
        res.status(404).json("No product found");
        return;
    }
    res.status(200).json(products);
}));

router.get("/getproduct", asyncHandler(async (req, res) => {
    console.log(req.query.keyword);
    const keyword = req.query.keyword;
    const product = await Product.find({
        $or: [{ name: { $regex: "(?i)" + keyword } },
        { category: { $regex: "(?i)" + keyword } },
        { brand: { $regex: "(?i)" + keyword } }]
    });
    res.status(200).json(product);
}));

// get relevant products
router.post("/relevant", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    if (!mongoose.Types.ObjectId.isValid(json.recipeId)) {
        res.status(404).json("Invalid recipe ID");
        return;
    }

    const recipe = await Recipe.findById(json.recipeId);
    if (recipe == null) {
        res.status(404).json("No recipe found");
        return;
    }

    // we want to put all our product names into a map so is easier to 
    // find and retrieve our product
    const productMap = new Map();
    const products = await Product.find({});
    products.forEach(product => {
        productMap.set(product.name.toLowerCase(), product);
    });

    const relevantProducts = [];
    recipe.ingredients.map(ingredient => ingredient.name.toLowerCase()).forEach((name) => {
        if (productMap.has(name)) {
            relevantProducts.push(productMap.get(name));
        }
    });

    res.status(200).json({ "relevantProducts": relevantProducts });
}));

// get a single product
router.get("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    // if invalid product id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Invalid product ID" });
        return;
    }
    const product = await Product.findById(id);
    // if no product found
    if (!product) {
        res.status(404).json({ error: "No product found." });
        return;
    }
    res.status(200).json(product);

}));
export default router;