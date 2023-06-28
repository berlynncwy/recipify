import express from "express";
import bodyParser from 'body-parser';

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";

const router = express.Router();

router.post("/signup", bodyParser.json(), asyncHandler(async (req, res) => {
    const json = req.body;
    const admin = new Admin(json);
    let resultAdmin = await admin.save();
    const user = new User({
        ...json,
        admin: resultAdmin._id
    });
    await user.save();
    res.json(resultAdmin);
    console.log("Admin created!");
}));



export default router;