import * as types from "./actionTypes";
import * as itemApi from "../apis/itemApis";

export const loadItemsSuccess = (items) => {
  return {
    type: types.LOAD_ITEMS,
    items,
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
