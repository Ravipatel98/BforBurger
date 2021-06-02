import axios from "axios";
import config from "../../config.json";

export const loadItems = async () => {
  try {
    const response = await axios.get(`${config.Backend_URL}item`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addItem = async (itemDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}item/add`,
      itemDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateItem = async (itemDetails) => {
  try {
    const response = await axios.put(
      `${config.Backend_URL}item/update`,
      itemDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`
    ${config.Backend_URL}item/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
