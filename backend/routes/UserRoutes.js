import express from "express";
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import requireAuth from "../middleware/requireAuth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import Recipe from "../models/RecipeModel.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// find email
router.get("/getemail", asyncHandler(async (req, res) => {
  console.log(req.query.email);
  const user = await User.findOne({ email: req.query.email });
  res.json(user);
}));

// user login
router.post("/login", bodyParser.json(), asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({ error: "** Email or password is incorrect." });
    console.log("user not found");
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).json({ error: "** Email or password is incorrect." });
    console.log("password incorrect");
    return;
  }
  try {
    const token = createToken(user._id);
    console.log("token created");
    res.status(200).json({ email: user.email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}));

// user sign up 
router.post("/signup", bodyParser.json(), asyncHandler(async (req, res) => {
  const json = req.body;
  console.log(json);
  try {
    const customer = new Customer(json);
    //const from = json.dob.split("-");
    //json.dob = new Date(from[0], from[1] - 1, from[2]);
    let resultCustomer = await customer.save();
    const user = new User({
      ...json,
      customer: resultCustomer._id
    });
    await user.save();
    console.log("Customer created!");

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}));

router.get("/:id", asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const user = await Customer.findById(req.params.id);
}));

// needs to be authenticated to create new recipe
router.use(requireAuth);

// create new recipe route
router.post("/newrecipe", bodyParser.json(), asyncHandler(async (req, res) => {
  const json = req.body;
  const recipe = new Recipe(json);
  let saveRecipe = await recipe.save();
  res.json(recipe);
  console.log("Recipe created!");
}));

//
router.post("/cart", bodyParser.json(), asyncHandler(async (req, res) => {
  console.log(req.body);
  const json = req.body;
  const email = json.user.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const item = {
        name: json.name,
        quantity: json.quantity,
        image: json.image,
        price: json.price,
        product: json._id
      };
      user.cart.push(item);
      await user.save();
      console.log("Product added to cart");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}


));

export default router;
