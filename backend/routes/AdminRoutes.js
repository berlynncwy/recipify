import express from "express";
import bodyParser from 'body-parser';

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";
import Product from "../models/ProductModel.js";
import Supplier from "../models/SupplierModel.js";

const router = express.Router();

// create new admin accounts
router.post("/signup", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    const admin = new Admin(json);
    let resultAdmin = await admin.save();
    const user = new User({
        ...json,
        admin: resultAdmin._id
    });
    await user.save();
    res.json(resultAdmin);
    console.log("Admin created!");
}));

// create new products
router.post("/add-product", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    const product = new Product(json);
    product.save();
    res.json(product);
    console.log("Product added!");
}));

// create new suppliers
router.post("/add-supplier", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    try {
        const supplier = new Supplier(json);
        supplier.save();
        res.json(supplier);
        console.log("Supplier added!");
    }
    catch (err) {
        res.status(400).json(err);
    }

}));

export default router;