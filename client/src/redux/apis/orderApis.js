import axios from "axios";
import config from "../../config.json";

export const checkout = async (orderDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}order/checkout`,
      orderDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loadOrders = async () => {
  try {
    const response = await axios.get(`${config.Backend_URL}order`);
    console.log("api", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateOrder = async (orderDetails) => {
  try {
    const response = await axios.put(
      `${config.Backend_URL}order/update`,
      orderDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};
