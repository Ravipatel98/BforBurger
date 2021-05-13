const router = require("express").Router();
const itemController = require("../controllers/item.controller");

router.get("/", itemController.findItems);
router.get("/:id", itemController.findItemById);
router.post("/add", itemController.createItem);
router.put("/update/:id", itemController.updateItem);
router.delete("/delete/:id", itemController.deleteItem);

module.exports = router;
