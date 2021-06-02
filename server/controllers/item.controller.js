const itemDao = require("../daos/item.dao");

const createItem = async (req, res) => {
  try {
    const data = await itemDao.createItem(req.body, req.file.path);
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const findItems = async (req, res) => {
  try {
    const data = await itemDao.findItems();
    if (data.length === 0)
      return res.status(200).json({ status: "Success", data: [] });
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const findItemById = async (req, res) => {
  try {
    const data = await itemDao.findItemById(req.params.id);
    if (!data) return res.status(404).json({ status: "Success", data });
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const data = await itemDao.findItemById(req.body._id);
    if (!data) return res.status(404).json("Not found!");
    let item = {};
    if (req.file) {
      item = await itemDao.updateItem(req.body._id, req.body, req.file.path);
    } else {
      item = await itemDao.updateItem(req.body._id, req.body, data.itemImage);
    }
    res.status(200).json({ status: "Success", data: item });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const data = await itemDao.findItemById(req.params.id);
    if (!data) return res.status(404).json("Not found!");
    const item = await itemDao.deleteItem(req.params.id);
    res.status(200).json({ status: "Success", data: item });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const itemController = {
  createItem,
  findItems,
  findItemById,
  updateItem,
  deleteItem,
};

module.exports = itemController;
