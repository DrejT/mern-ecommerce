const mongoose = require("mongoose");

const store = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  businessEmail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 250,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Store", store);
