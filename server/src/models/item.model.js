const mongoose = require("mongoose");

const item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  sale: {
    type: Number,
  },
  price: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Item", item);
