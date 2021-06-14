import axios from "axios";
import config from "../../config.json";

export const loadUsers = async () => {
  try {
    const response = await axios.get(`${config.Backend_URL}user`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addUser = async (userDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}user/add`,
      userDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userDetails) => {
  try {
    const response = await axios.put(
      `${config.Backend_URL}user/update`,
      userDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `${config.Backend_URL}user/delete/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
