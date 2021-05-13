const Item = require("../models/item.model");

const findItems = () => Item.find();

const createItem = (item) => {
  const newItem = new Item(item);
  return newItem.save();
};

const findItemById = (id) => Item.findById(id);

const updateItem = (id, item) => {
  const updatedItem = {
    name: item.name,
    type: item.type,
    timeToPrep: item.timeToPrep,
  };
  return Item.findByIdAndUpdate(id, updatedItem, {
    useFindAndModify: false,
  });
};

const deleteItem = (id) => Item.findByIdAndDelete(id);

const itemDao = {
  findItems,
  createItem,
  findItemById,
  updateItem,
  deleteItem,
};

module.exports = itemDao;
