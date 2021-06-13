import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const itemReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.LOAD_ITEMS:
      newState.items = action.items.data.data;
      return newState;
    case types.UPDATE_ITEM_DETAILS:
      newState.updateItemDetails = action.item;
      return newState;
    case types.ADD_TO_CART:
      console.log("newState", newState);
      const item = newState.items.find((product) => product._id === action.id);
      const inCart = newState.cart.find((item) =>
        item._id === action.id ? true : false
      );
      newState.cart = inCart
        ? newState.cart.map((item) =>
            item._id === action.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...newState.cart, { ...item, qty: 1 }];
      return newState;
    case types.REMOVE_FROM_CART:
      newState.cart = newState.cart.filter((item) => item._id !== action.id);
      return newState;
    case types.ADJUST_ITEM_QTY:
      newState.cart = newState.cart.map((item) =>
        item._id === action.id ? { ...item, qty: +action.qty } : item
      );
      return newState;
    default:
      return newState;
  }
};

export default itemReducer;
