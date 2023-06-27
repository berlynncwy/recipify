import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: false
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: false
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model("User", userSchema);

export default User;

