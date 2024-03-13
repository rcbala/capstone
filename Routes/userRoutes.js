import express from "express";
import bcrypt from "bcrypt";
import { generateToken, getByEmail } from "../Controllers/userController.js";
import User from "../Models/userModel.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await getByEmail(req);

    if (!user) {
      return res.status(404).json({
        error: "Invalid User",
      });
    }

    const validatepassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatepassword) {
      return res.status(404).json({
        error: "Wrong Password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Sucessfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let user = await getByEmail(req);

    if (user) {
      return res.status(400).json({ error: "User Already Exsist!" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      ...req.body,
      password: hashpassword,
    }).save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registered Sucessfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export const UserRouter = router;
