const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
  domain: String,
  description: String,
  priority: String,
  status: { type: String, default: "פתוח" },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Ticket", TicketSchema);