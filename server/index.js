const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/maintenance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("🔗 MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tickets", require("./routes/tickets"));

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));