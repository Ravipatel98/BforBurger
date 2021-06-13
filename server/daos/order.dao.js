const Order = require("../models/order.model");

const findOrders = () => Order.find().sort({ createdAt: "desc" });

const createOrder = (orderDetails) => {
  const order = new Order(orderDetails);
  return order.save();
};

const findOrderById = (id) => Order.findById(id);

const updateOrder = (orderDetails) =>
  Order.findByIdAndUpdate(orderDetails._id, orderDetails, {
    useFindAndModify: false,
  });

const orderDao = {
  createOrder,
  findOrders,
  updateOrder,
  findOrderById,
};

module.exports = orderDao;
