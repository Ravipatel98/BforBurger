import * as types from "./actionTypes";
import * as userApi from "../apis/userApis";

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS,
    users,
  };
};

export const addUserSuccess = (user) => {
  return {
    type: types.ADD_USER,
    user,
  };
};

export const updateUserDetailsSuccess = (userDetails) => {
  return {
    type: types.UPDATE_USER_DETAILS,
    userDetails,
  };
};

export const updateUserSuccess = (userDetails) => {
  return {
    type: types.UPDATE_USER,
    userDetails,
  };
};

export const deleteUserSuccess = (id) => {
  return {
    type: types.DELETE_USER,
    id,
  };
};

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userApi.loadUsers();
      dispatch(loadUsersSuccess(users));
      return users;
    } catch (error) {
      return error;
    }
  };
};

export const addUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const user = await userApi.addUser(userDetails);
      dispatch(addUserSuccess(user));
      return user;
    } catch (error) {
      return error;
    }
  };
};

export const updateUserDetails = (userDetails) => {
  return (dispatch) => {
    try {
      dispatch(updateUserDetailsSuccess(userDetails));
    } catch (error) {
      return error;
    }
  };
};

export const updateUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const user = await userApi.updateUser(userDetails);
      dispatch(updateUserSuccess(user));
      return user;
    } catch (error) {
      return error;
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await userApi.deleteUser(id);
      dispatch(deleteUserSuccess(user));
      return user;
    } catch (error) {
      return error;
    }
  };
};
