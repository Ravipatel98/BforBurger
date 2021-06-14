const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Array, default: [] },
    data: { type: Array, default: [] },
    product: { type: Array, default: [] },
    timeToPrep: { type: Number, required: true },
    status: { type: String, required: true },
    totalAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
