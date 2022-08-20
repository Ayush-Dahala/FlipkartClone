export const getProductsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case "getProductSuccess":
      return { products: action.payload };
    case "getProductFailure":
      return { error: action.payload };
    default:
      return state;
  }
};
export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "getProductDetailRequest":
      return { loading: true };
    case "getProductDetailSuccess":
      return { loading: false, product: action.payload };
    case "getProductDetailFailure":
      return { loading: false, error: action.payload };
    case "getProductDetailReset":
      return { product: {} };
    default:
      return state;
  }
};
