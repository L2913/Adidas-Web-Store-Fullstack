const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: String,

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  total: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);