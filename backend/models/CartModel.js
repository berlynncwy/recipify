import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
        }],
}, {
    timestamps: true
});
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;