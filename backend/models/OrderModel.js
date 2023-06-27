import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    discountPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    statusDetails: {
        status: {
            type: String,
            enum: ["pending", "processing", "out for delivery", "completed", "cancelled"],
            default: "pending"
        },
        time: {
            type: Date,
            required: true
        },
    },
},
    {
        timestamps: true
    });
const Order = mongoose.model("Order", orderSchema);

export default Order;