const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/", auth, async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { domain, description, priority } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const ticket = new Ticket({ domain, description, priority, imageUrl });
  await ticket.save();
  res.json({ message: "הקריאה נשמרה", ticket });
});

router.patch("/:id", auth, async (req, res) => {
  const { status } = req.body;
  await Ticket.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "עודכן בהצלחה" });
});

router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "נמחק בהצלחה" });
});

module.exports = router;