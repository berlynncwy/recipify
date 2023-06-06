// Database schemas

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipify");

// create user schema and object
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
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    }
});
const User = mongoose.model("User", userSchema);

// create customer schema and object
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
});
const Customer = mongoose.model("Customer", customerSchema);

// create product schema and object
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
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model("Product", productSchema);

// create recipe schema and object
const recipeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        quantity: Number,
        unit: String,
        required: true
    }],
    instructions: {
        type: [String],
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    nutritionFact: {
        calories: Number,
        carbohydrates: Number,
        fat: Number,
        protein: Number,
        required: true
    },
    photo: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Recipe = mongoose.model("Recipe", recipeSchema);

// create ingredient schema and object
// to be used to display ingredient list in recipe page
const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true,
        unique: true
    },
});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

// create review schema and object
const reviewSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Review = mongoose.model("Review", reviewSchema);

// create order schema and object
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

// create shopping cart schema and object
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Cart = mongoose.model("Cart", cartSchema);

// create stock schema and object
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

// create supplier schema and object
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









