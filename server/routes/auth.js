const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = "maintenance123";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "התחברות נכשלה" });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });
  res.json({ token });
});

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 8);
  const newUser = new User({ username, password: hashed, role });
  await newUser.save();
  res.json({ message: "נרשמת בהצלחה" });
});

module.exports = router;