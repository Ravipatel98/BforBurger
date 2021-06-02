import * as types from "./actionTypes";
import * as authApi from "../apis/authApis";

export const registerUserSuccess = (user) => {
  return {
    type: types.REGISTER_USER_SUCCESS,
    user,
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user,
  };
};

export const logOutUserSuccess = () => {
  return {
    type: types.LOGOUT_USER_SUCCESS,
  };
};

export const registerUser = (userDetails) => {
  return async (dispatch) => {
    try {
      console.log("action", userDetails);
      const user = await authApi.registerUser(userDetails);
      dispatch(registerUserSuccess(user));
      return user;
    } catch (error) {
      return error;
    }
  };
};

export const loginUser = (userDetails) => {
  return async (dispatch) => {
    try {
      console.log("action", userDetails);
      const user = await authApi.loginUser(userDetails);
      dispatch(loginUserSuccess(user));
      return user;
    } catch (error) {
      return error;
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    try {
      const user = {};
      dispatch(logOutUserSuccess());
      return user;
    } catch (error) {
      return error;
    }
  };
};
