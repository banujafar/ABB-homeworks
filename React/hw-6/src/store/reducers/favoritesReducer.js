const initialState = {
  favorites: [],
};
export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FAVORITES_PRODUCTS":
      return {
        favorites: action.payload,
      };

    default:
      return state;
  }
};

// Local storage retrieval
try {
  const data = localStorage.getItem("favorites");
  initialState.favorites = data ? JSON.parse(data) : [];
} catch (err) {
  console.error("Error parsing cart data:", err);
  initialState.favorites = [];
}
