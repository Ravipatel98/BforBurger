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
