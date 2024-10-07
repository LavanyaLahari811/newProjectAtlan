const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPassword });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username }).lean();

  if (!user) {
    return res.json({
      message: "user doesn't exist",
    });
  }
  // console.log(user);
  // console.log(user._id);
  // console.log(user._id.toString());

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      message: "username or password is Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  // console.log(user);
  res.json({ token, userId: user._id });
});

const userRouter = router;
module.exports = userRouter;
