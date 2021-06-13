import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.LOAD_USERS:
      newState.users = action.users;
      return newState;
    case types.UPDATE_USER_DETAILS:
      newState.updateUserDetails = action.userDetails;
      return newState;
    default:
      return newState;
  }
};

export default userReducer;
