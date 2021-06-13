const orderDao = require("../daos/order.dao");

const findOrders = async (req, res) => {
  try {
    const data = await orderDao.findOrders();
    if (data.length === 0)
      return res.status(200).json({ status: "Success", data: [] });
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const checkoutOrder = async (req, res) => {
  try {
    let history = [];
    let transactionData = {};
    req.body.cartDetails.forEach((item) => {
      history.push({
        dateOfPurchase: Date.now(),
        name: item.name,
        id: item._id,
        price: item.price,
        qty: item.qty,
        paymentId: req.body.paymentData.paymentID,
      });
    });
    transactionData.user = {
      id: req.body.user._id,
      userName: req.body.user.userName,
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    transactionData.timeToPrep = 10;
    transactionData.status = "placed";
    transactionData.totalAmount = req.body.totalAmount;
    console.log("transactionData >>", transactionData);
    const data = await orderDao.createOrder(transactionData);
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await orderDao.findOrderById(req.body._id);
    if (!order)
      res.status(401).json({ success: false, msg: "Could not find the order" });
    const data = await orderDao.updateOrder(req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const orderController = {
  checkoutOrder,
  findOrders,
  updateOrder,
};

module.exports = orderController;
