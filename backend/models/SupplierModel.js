import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
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
const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;