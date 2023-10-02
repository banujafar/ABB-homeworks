const initialState = {
  cart: [],
  count: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_PRODUCTS":
      return {
        ...state,
        cart: action.payload,
        count: calculateTotalCount(action.payload),
      };
    case "INCREASE_CART_PRODUCTS":
    case "DECREASE_CART_PRODUCTS":
      return {
        ...state,
        cart: action.payload,
        count: calculateTotalCount(action.payload),
      };
    default:
      return state;
  }
};

// Helper function to calculate total count
const calculateTotalCount = (cart) => {
  return cart.reduce((sum, cartElement) => sum + cartElement.count, 0);
};

// Local storage retrieval
try {
  const data = localStorage.getItem("cart");
  initialState.cart = data ? JSON.parse(data) : [];
  initialState.count = calculateTotalCount(initialState.cart);
} catch (err) {
  console.error("Error parsing cart data:", err);
  initialState.cart = [];
}
