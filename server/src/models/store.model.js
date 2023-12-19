const mongoose = require("mongoose");

const store = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  businessEmail: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  description: {
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
