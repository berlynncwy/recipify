import express from "express";
import stripeInit from "stripe";
import asyncHandler from "../middleware/asyncHandler.js";
import requireAuth from "../middleware/requireAuth.js";
import Order from "../models/OrderModel.js";

const router = express.Router();
const domain = "http://localhost:5173";

const stripe = stripeInit("sk_test_51OECYmHBf5r5gOUvnDYolCbgkxPmzNCn8KNiZoHt1cRxHHfGc6TEQUMRbAmuu0Bn4rTqtYBg8yCjuSY0TCAy7Ttk003LH8fqCo");


// needs to be authenticated to create new recipe
router.use(requireAuth);

router.get("/orders", asyncHandler(async (req, res) => {
    const user = req.user;
    console.log("user-------" + user);
    let orders = [];
    try {
        orders = await Order.find({ user: user._id }).sort({ "createdAt": -1 });
        console.log(orders);
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
        return;
    }
    let ret = [];
    for (const i in orders) {
        const order = orders[i];
        console.log("ordersssession------" + order.session);
        const sessionID = order.session;
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionID);

            ret.push({ order, session });
            console.log(session);
        } catch (err) {
            console.warn(err);
            res.status(500).json({ message: "Something went wrong. Please try again later" });
        }
    }

    res.status(200).json(ret);
}));

router.get("/orders/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("id:" + id);
    console.log({ id });
    try {
        const order = await Order.findById(id);
        const session = await stripe.checkout.sessions.retrieve(order.session);
        res.status(200).json({ order, session });
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
        return;
    }

}));

router.post("/cancel-order", asyncHandler(async (req, res) => {
    const { session } = req.body;
    const sessionID = session.id;
    console.log(sessionID);
    try {
        const expireSession = await stripe.checkout.sessions.expire(sessionID);
        res.status(200).json(expireSession.status);
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
    }

}));

router.post("/create-checkout-session", asyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const cart = body.cart;
    const items = cart.map((item) => {
        return {
            price_data: {
                currency: 'sgd',
                unit_amount: Math.round(item.price * 100),
                product_data: {
                    name: item.name,
                    images: item.image,
                },
            },
            quantity: item.quantity,
        };
    });
    console.log(items);
    const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`,
        shipping_address_collection: { allowed_countries: ["SG"] }
    });

    console.log(session.id);
    console.log(user._id);
    console.log(cart);

    const order = new Order();
    order.session = session.id;
    order.user = user._id;
    order.items = cart;

    try {
        let savedOrder = await order.save();
        console.log(savedOrder);
        if (!savedOrder) {
            res.status(400).json({ message: "Something went wrong. Please try again" });
            return;
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again" });
        return;
    }

    user.cart = [];
    try {
        let savedUser = await user.save();
        if (!savedUser) {
            res.status(400).json({ message: "Something went wrong. Please try again" });
            return;
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: "Something went wrong. Please try again" });
        return;
    }
    res.status(200).json({ url: session.url });
}));

export default router;