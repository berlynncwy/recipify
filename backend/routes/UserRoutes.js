import express from "express";
import bodyParser from 'body-parser';

import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import Recipe from "../models/RecipeModel.js";

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post("/recipe", bodyParser.json(), asyncHandler(async (req, res) => {
  const json = req.body;
  const recipe = new Recipe(json);
  let saveRecipe = await recipe.save();
  res.json(recipe);
  console.log("Recipe created!");
}));

router.post("/signup", bodyParser.json(), asyncHandler(async (req, res) => {
  const json = req.body;
  const from = json.dob.split("-");
  json.dob = new Date(from[0], from[1] - 1, from[2]);

  const customer = new Customer(json);
  let resultCustomer = await customer.save();
  const user = new User({
    ...json,
    customer: resultCustomer._id
  });
  await user.save();
  res.json(resultCustomer);
  console.log("Customer created!");

}));

export default router;
