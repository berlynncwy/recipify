import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model("Product", productSchema);

export default Product;