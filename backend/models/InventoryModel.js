import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
});
const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;