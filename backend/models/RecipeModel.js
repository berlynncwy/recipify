import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
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
},
    {
        timestamps: true
    }
);

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
        name: String,
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
    image: {
        type: [String],
        required: true
    },

    review: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
},
    {
        timestamps: true
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;