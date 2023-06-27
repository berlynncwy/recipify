import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date
    },
    address: {
        street: String,
        unitNo: String,
        postalCode: String
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    favourites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }
},
    {
        timestamps: true,
    });
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;