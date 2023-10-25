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
    }

},
    {
        timestamps: true,
    });
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;