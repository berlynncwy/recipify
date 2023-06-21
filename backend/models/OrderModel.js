import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [{
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "out for delivery", "completed", "cancelled"],
        default: "pending"
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        unitNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Order = mongoose.model("Order", orderSchema);

export default Order;