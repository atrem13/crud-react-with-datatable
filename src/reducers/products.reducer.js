const initialState = [];

const productsReducer = (state = initialState, action = {}) => {
  if (action.type === "PRODUCTS/SET_PRODUCTS") {
    return [...state, ...action.payload];
  }

  return state;
};

export default productsReducer;
