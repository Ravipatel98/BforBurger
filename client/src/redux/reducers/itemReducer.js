import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const itemReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.LOAD_ITEMS:
      newState.items = action.items;
      return newState;
    case types.UPDATE_ITEM_DETAILS:
      newState.updateItemDetails = action.item;
      return newState;
    default:
      return newState;
  }
};

export default itemReducer;
