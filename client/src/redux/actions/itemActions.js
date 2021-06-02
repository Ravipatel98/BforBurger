import * as types from "./actionTypes";
import * as itemApi from "../apis/itemApis";

export const loadItemsSuccess = (items) => {
  return {
    type: types.LOAD_ITEMS,
    items,
  };
};

export const addItemSuccess = (item) => {
  return {
    type: types.ADD_ITEM,
    item,
  };
};

export const updateItemDetailsSuccess = (item) => {
  return {
    type: types.UPDATE_ITEM_DETAILS,
    item,
  };
};

export const updateItemSuccess = (item) => {
  return {
    type: types.UPDATE_ITEM,
    item,
  };
};

export const deleteItemSuccess = (id) => {
  return {
    type: types.DELETE_ITEM,
    id,
  };
};

export const loadItems = () => {
  return async (dispatch) => {
    try {
      const items = await itemApi.loadItems();
      dispatch(loadItemsSuccess(items));
      return items;
    } catch (error) {
      return error;
    }
  };
};

export const addItem = (itemDetails) => {
  return async (dispatch) => {
    try {
      console.log("action", itemDetails);
      const item = await itemApi.addItem(itemDetails);
      dispatch(addItemSuccess(item));
      return item;
    } catch (error) {
      return error;
    }
  };
};

export const updateItemDetails = (itemDetails) => {
  return (dispatch) => {
    try {
      dispatch(updateItemDetailsSuccess(itemDetails));
      console.log(itemDetails);
      return itemDetails;
    } catch (error) {
      return error;
    }
  };
};

export const updateItem = (itemDetails) => {
  return async (dispatch) => {
    try {
      const item = await itemApi.updateItem(itemDetails);
      dispatch(updateItemSuccess(item));
      return item;
    } catch (error) {
      return error;
    }
  };
};

export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      const item = await itemApi.deleteItem(id);
      dispatch(deleteItemSuccess(item));
      return item;
    } catch (error) {
      return error;
    }
  };
};
