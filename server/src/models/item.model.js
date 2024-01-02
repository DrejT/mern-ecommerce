const mongoose = require("mongoose");

const item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  sale: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  onShelf: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Item", item);
