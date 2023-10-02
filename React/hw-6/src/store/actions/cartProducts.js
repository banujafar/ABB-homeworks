import { ActionTypes } from "./actionTypes";

export const cartProducts = (product) => (dispatch, getState) => {
  const cartState = getState().cart.cart; // Access the current cart state

  const sameIndexElement = cartState.findIndex(
    (cartElement) => cartElement.sku === product.sku
  );

  if (sameIndexElement !== -1) {
    const updatedCart = [...cartState];
    updatedCart[sameIndexElement]["count"] += 1;
    dispatch({
      type: ActionTypes.GET_CART_PRODUCTS,
      payload: updatedCart,
    });
  } else {
    dispatch({
      type: ActionTypes.GET_CART_PRODUCTS,
      payload: [...cartState, { ...product, count: 1 }],
    });
  }
};

export const increaseCartProducts = (product) => (dispatch, getState) => {
  const productState = getState().products.products;
  const cart = getState().cart.cart;
  const productPrice = productState.filter(
    (cartElement) => cartElement.sku === product.sku
  );
  const updatedCart = cart.map((cartElement) =>
    cartElement.sku === product.sku
      ? {
          ...cartElement,
          count: cartElement.count + 1,
          price: (productPrice[0].price * (cartElement.count + 1)).toFixed(2),
        }
      : cartElement
  );
  dispatch({
    type: ActionTypes.INCREASE_CART_PRODUCTS,
    payload: updatedCart,
  });
};

export const decreaseCartProducts = (product) => (dispatch, getState) => {
  const productState = getState().products.products;
  const cart = getState().cart.cart;
  const productPrice = productState.filter(
    (cartElement) => cartElement.sku === product.sku
  );

  if (product.count >= 2) {
    const updatedCart = cart.map((cartElement) =>
      cartElement.sku === product.sku
        ? {
            ...product,
            count: cartElement.count - 1,
            price: (productPrice[0].price * (cartElement.count - 1)).toFixed(2),
          }
        : cartElement
    );
    dispatch({
      type: ActionTypes.DECREASE_CART_PRODUCTS,
      payload: updatedCart,
    });
  }
};

export const removeCart = (product) => (dispatch, getState) => {
  const cartState = getState().cart.cart;
  const filteredCart = cartState.filter(
    (cartElement) => cartElement.sku !== product.sku
  );
  dispatch({
    type: ActionTypes.GET_CART_PRODUCTS,
    payload: filteredCart,
  });
};

export const handleCheckedProducts = (product) => (dispatch, getState) => {
  const cartState = getState().cart.cart;
  const updatedCart = cartState.map((cartElement) =>
    cartElement.sku === product.sku
      ? {
          ...cartElement,
          checked: !product.checked,
        }
      : cartElement
  );
  dispatch({
    type: ActionTypes.GET_CART_PRODUCTS,
    payload: updatedCart,
  });
};

export const handleClearCartProducts = () => (dispatch, getState) => {
  const cart = getState().cart.cart;
  const updatedCart = cart.filter((cartElement) => !cartElement.checked);
  const purchasedCart = cart.filter((cartElement) => cartElement.checked);
  console.log(purchasedCart);
  dispatch({
    type: ActionTypes.GET_CART_PRODUCTS,
    payload: updatedCart,
  });
};
