import axios from "axios";
import config from "../../config.json";

export const registerUser = async (userDetails) => {
  try {
    console.log("api", userDetails);
    const response = await axios.post(
      `${config.Backend_URL}auth/register`,
      userDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (userDetails) => {
  try {
    console.log("api", userDetails);
    const response = await axios.post(
      `${config.Backend_URL}auth/login`,
      userDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};
