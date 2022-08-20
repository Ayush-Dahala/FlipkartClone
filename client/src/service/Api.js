import axios from "axios";

const URL = "";

export const authenticationSignUp = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("error in signup", error);
  }
};

export const authenticationLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("error in login", error);
  }
};

export const payUsingPaytm = async (data) => {
  try {
    let response = await axios.post(`${URL}/payment`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling payment api", error);
  }
};
