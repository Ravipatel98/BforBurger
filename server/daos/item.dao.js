const Item = require("../models/item.model");

const findItems = () => Item.find();

const createItem = (item, itemImage) => {
  const newItem = new Item({
    name: item.name,
    type: item.type,
    price: item.price,
    timeToPrep: item.timeToPrep,
    itemImage,
  });
  return newItem.save();
};

const findItemById = (id) => Item.findById(id);

const updateItem = (id, item, itemImage) => {
  const updatedItem = {
    name: item.name,
    type: item.type,
    price: item.price,
    timeToPrep: item.timeToPrep,
    itemImage,
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
