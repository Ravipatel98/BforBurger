import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const authReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      newState.loggedInUser = action.user;
      return newState;
    case types.LOGIN_USER_SUCCESS:
      newState.loggedInUser = action.user;
      return newState;
    case types.LOGOUT_USER_SUCCESS:
      newState.loggedInUser = {};
      localStorage.setItem("loggedInUser", "");
      return newState;
    case types.SET_LOGGED_IN_USER:
      newState.loggedInUser = action.user;
      return newState;
    default:
      return newState;
  }
};

export default authReducer;
