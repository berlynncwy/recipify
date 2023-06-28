import express from "express";
import bodyParser from 'body-parser';

import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";

const router = express.Router();

router.post("/customer", bodyParser.json(), asyncHandler(async (req, res) => {
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

router.post("/admin", bodyParser.json(), asyncHandler(async (req, res) => {
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
    // let session = null;
    // return Customer.startSession().then(_session => {
    //     session = _session; // create session variable
    //     session.startTransaction(); // start transaction
    //     // first command in transaction
    //     const customer = new Customer(json);
    //     return customer.save();
    // }).then(resultCustomer => {
    //     const user = new User({
    //         ...json,
    //         customer: resultCustomer._id
    //     });
    //     return user.save();
    // }).then(() => session.commitTransaction())
    //     .then(() => session.endSession())
    //     .then(() => {

    //         console.log("Customer created!");
    //         res.json(resultCustomer);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500);
    //     });

