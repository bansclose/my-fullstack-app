const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Tạo user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
