import express from "express";
import bodyParser from 'body-parser';
import requireAuth from "../middleware/requireAuth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Customer from "../models/CustomerModel.js";
import Product from "../models/ProductModel.js";
import Supplier from "../models/SupplierModel.js";

const router = express.Router();

router.get("/getemail", asyncHandler(async (req, res) => {
    console.log(req.query.email);
    try {
        const user = await User.findOne({ email: req.query.email });
        if (user != null) {
            const customer = await Customer.findById(user.customer);
            console.log(customer);
            res.status(200).json({ user, customer });
            return;
        }
        res.status(200).json({ user: null, customer: null });
    } catch (err) {
        console.warn(err);
    }
}));

// get all suppliers
router.get("/suppliers", asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({});
    if (!suppliers) {
        res.status(404).json({ suppliers: [] });
        return;
    }
    console.log(suppliers);
    res.status(200).json({ suppliers });
}));

// get all products
router.get("/products", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (!products) {
        res.status(404).json({ products: [] });
        return;
    } console.log(products);
    res.status(200).json({ products });
}));

router.use(requireAuth);

// make user admin
router.post("/make-admin", asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(401).json({ error: 'Request is not authorized; requires Admin' });
        return;
    }

    const { id, isAdmin } = req.body;
    const admin = await User.findByIdAndUpdate(id, { isAdmin });
    console.log(admin);
    res.status(200).json({});
}));

// create new products
router.post("/add-product", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    const user = req.user;
    try {
        const product = new Product({ ...json, createdBy: user._id });
        product.save();
        res.json(product);
        console.log("Product added!");
    } catch (err) {
        console.warn(err);
    }

}));

router.post("/edit-product/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("product edit");
    try {
        console.log(req.body);
        const updated = req.body;
        await Product.findByIdAndUpdate(updated._id, updated);
        res.status(200).json("Product successfully updated.");
    } catch (err) {
        console.warn(err);
        res.status(400).json(err);
    }
}));

// delete product
router.delete("/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("removing product ------");
    const { id } = req.params;
    try {
        await Product.deleteOne({ _id: id });
        res.status(200).json("Product successfully removed.");
    } catch (err) {
        res.status(400).json(err);
    }
    console.log(id);
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