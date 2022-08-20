import axios from "axios";

const Url = "";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${Url}/products`);
    console.log(data);
    dispatch({ type: "getProductSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getProductFailure", payload: error.message });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductDetailRequest" });
    const {data} = await axios.get(`${Url}/product/${id}`);
    console.log(data)
    dispatch({ type: "getProductDetailSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getProductDetailFailure", payload: error.message });
  }
};
