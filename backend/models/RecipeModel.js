import mongoose from "mongoose";

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
    image: {
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

export default Recipe;