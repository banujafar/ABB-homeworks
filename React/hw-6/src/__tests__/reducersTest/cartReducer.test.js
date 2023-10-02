import { ActionTypes } from "../../store/actions/actionTypes";
import { cartReducer } from "../../store/reducers/cartReducer";

describe("cartReducer", () => {
  const initialState = {
    cart: [],
    count: 0,
  };

  test("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual({
      cart: [],
      count: 0,
    });
  });
  test("should handle change  state", () => {
    expect(
      cartReducer(initialState, {
        type: ActionTypes.GET_CART_PRODUCTS,
        payload: [
          {
            name: "Infinix Hot 30i 4/128 GB Blue",
            price: 849.5,
            imagePath:
              "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
            sku: "PHN-008",
            color: "Blue",
            count: 3,
          },
        ],
      })
    ).toEqual({
      cart: [
        {
          name: "Infinix Hot 30i 4/128 GB Blue",
          price: 849.5,
          imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
          sku: "PHN-008",
          color: "Blue",
          count: 3,
        },
      ],
      count: 3,
    });
  });
});
