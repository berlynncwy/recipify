import express from "express";
import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";

const router = express.Router();

// get all products
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
}));

// get a single product
router.get("/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
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