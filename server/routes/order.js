const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.post("/checkout", orderController.checkoutOrder);
router.get("/", orderController.findOrders);
router.put("/update", orderController.updateOrder);

module.exports = router;
