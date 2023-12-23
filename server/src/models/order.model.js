const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamps: true,
});

module.exports = mongoose.model("Order", Order);
