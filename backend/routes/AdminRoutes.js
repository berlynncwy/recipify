import express from "express";
import bodyParser from 'body-parser';
import requireAuth from "../middleware/requireAuth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Customer from "../models/CustomerModel.js";
import Product from "../models/ProductModel.js";
import Supplier from "../models/SupplierModel.js";
import Order from "../models/OrderModel.js";
import stripeInit from "stripe";

const router = express.Router();
const domain = "http://localhost:5173";

const stripe = stripeInit("sk_test_51OECYmHBf5r5gOUvnDYolCbgkxPmzNCn8KNiZoHt1cRxHHfGc6TEQUMRbAmuu0Bn4rTqtYBg8yCjuSY0TCAy7Ttk003LH8fqCo");

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

// get supplier by keyword
router.get("/getsupplier", asyncHandler(async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const supplier = await Supplier.find({
            $or: [{ name: { $regex: "(?i)" + keyword } },
            { contactPerson: { $regex: "(?i)" + keyword } }]
        });
        if (!supplier) {
            res.status(404).json({ suppliers: [] });
            return;
        }
        res.status(200).json(supplier);
        return;

    } catch (err) {
        console.warn(err);
    }

}));

// get order by keyword
router.get("/getorder", asyncHandler(async (req, res) => {
    const keyword = req.query.keyword;

    let orders = [];
    let userCustomerMap = new Map();

    try {
        orders = await Order.find({ _id: keyword }).sort({ "createdAt": -1 });
        // console.log(orders);
        const userIds = orders.map((order) => order.user);
        const users = await User.find({ "_id": { $in: userIds } });
        const custIds = users.map(user => user.customer);
        const customers = await Customer.find({ "_id": { $in: custIds } });
        const customerMap = new Map(customers.map(customer => [customer._id.toHexString(), customer]));
        userCustomerMap = new Map(users.map(user => [user._id.toHexString(), customerMap.get(user.customer.toHexString())]));
        console.log(customerMap);
        console.log(userCustomerMap);
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
        return;
    }

    let ret = [];
    for (const i in orders) {
        const order = orders[i];
        // console.log("ordersssession------" + order.session);
        const sessionID = order.session;
        const customer = userCustomerMap.get(order.user.toHexString());
        if (customer == null) {
            continue;
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionID);
            ret.push({ customer, order, session });
        } catch (err) {
            console.warn(err);
            res.status(500).json({ message: "Something went wrong. Please try again later" });
        }
    }
    console.log(ret);
    res.status(200).json(ret);
    return;


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
    const user = req.user;
    try {
        const supplier = new Supplier({ ...json, createdBy: user._id });
        supplier.save();
        res.json(supplier);
        console.log("Supplier added!");
    }
    catch (err) {
        res.status(400).json(err);
    }

}));

router.post("/edit-supplier/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("supplier edit");
    try {
        console.log(req.body);
        const updated = req.body;
        await Supplier.findByIdAndUpdate(updated._id, updated);
        res.status(200).json("Supplier successfully updated.");
    } catch (err) {
        console.warn(err);
        res.status(400).json(err);
    }
}));

// delete supplier
router.delete("/supplier/:id", bodyParser.json(), asyncHandler(async (req, res) => {
    console.log("removing product ------");
    const { id } = req.params;
    try {
        await Supplier.deleteOne({ _id: id });
        res.status(200).json("Supplier successfully removed.");
    } catch (err) {
        res.status(400).json(err);
    }
    console.log(id);
}));

router.get("/orders", asyncHandler(async (req, res) => {
    let orders = [];
    let userCustomerMap = new Map();

    try {
        orders = await Order.find({}).sort({ "createdAt": -1 });
        // console.log(orders);
        const userIds = orders.map((order) => order.user);
        const users = await User.find({ "_id": { $in: userIds } });
        const custIds = users.map(user => user.customer);
        const customers = await Customer.find({ "_id": { $in: custIds } });
        const customerMap = new Map(customers.map(customer => [customer._id.toHexString(), customer]));
        userCustomerMap = new Map(users.map(user => [user._id.toHexString(), customerMap.get(user.customer.toHexString())]));
        console.log(customerMap);
        console.log(userCustomerMap);
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
        return;
    }

    let ret = [];
    for (const i in orders) {
        const order = orders[i];
        // console.log("ordersssession------" + order.session);
        const sessionID = order.session;
        const customer = userCustomerMap.get(order.user.toHexString());
        if (customer == null) {
            continue;
        }

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionID);
            ret.push({ customer, order, session });
        } catch (err) {
            console.warn(err);
            res.status(500).json({ message: "Something went wrong. Please try again later" });
        }
    }
    res.status(200).json(ret);
    // try {
    //     const sessions = await stripe.checkout.sessions.list({
    //         limit: 10
    //     });
    //     res.status(200).json(sessions);
    // } catch (err) {
    //     console.warn(err);
    //     res.status(500).json({ message: "Something went wrong. Please try again later" });

    // }

}));

export default router;