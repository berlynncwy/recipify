import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true,
        unique: true
    },
});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;