import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
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
    },
    cart: [
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
                type: [String],
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
        }],
},
    {
        timestamps: true,
    });


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);


export default User;

