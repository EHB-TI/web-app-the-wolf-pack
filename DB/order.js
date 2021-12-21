const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_url: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  }
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;