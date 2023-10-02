import { ActionTypes } from "./actionTypes";

export const favoriteProducts = (product) => (dispatch, getState) => {
  const favorites = getState().favorites.favorites; // Access the current cart state

  if (favorites.includes(product)) {
    const filteredFavorites = favorites.filter(
      (favorite) => favorite.sku !== product.sku
    );
    dispatch({
      type: ActionTypes.GET_FAVORITES_PRODUCTS,
      payload: filteredFavorites,
    });
  } else {
    dispatch({
      type: ActionTypes.GET_FAVORITES_PRODUCTS,
      payload: [...favorites, product],
    });
  }
};
