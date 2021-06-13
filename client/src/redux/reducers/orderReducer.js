import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const orderReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.LOAD_ORDERS:
      newState.orders = action.orders;
      return newState;
    default:
      return state;
  }
};

export default orderReducer;
