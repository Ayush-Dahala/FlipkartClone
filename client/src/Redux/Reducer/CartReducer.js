const cartReducer = (state={cartItems:[]}, action) => {
  switch (action.type) {
    case "AddToCart":
      const item = action.payload;
      const exist = state.cartItems.find((product) => product.id === item.id);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((data) =>
            data.product === exist.product ? data : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case "RemoveFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
