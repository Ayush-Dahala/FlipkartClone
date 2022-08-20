import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducer from "./CartReducer";
import { getProductsReducer } from "./ProductsReducer";
import { getProductDetailsReducer } from "./ProductsReducer";

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetails:getProductDetailsReducer,
  cart:cartReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;