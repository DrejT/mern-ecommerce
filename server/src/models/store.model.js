const mongoose = require("mongoose");

const store = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  business_email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Store", store);
