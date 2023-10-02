import { ActionTypes } from "../../store/actions/actionTypes";
import { cartReducer } from "../../store/reducers/cartReducer";
import { productReducer } from "../../store/reducers/productReducer";

describe("productReducer", () => {
  const initialState = {
    products: [],
  };

  test("should return the initial state", () => {
    expect(productReducer(undefined, {})).toEqual({
      products: [],
    });
  });
  test("should handle change  state", () => {
    expect(
      productReducer(initialState, {
        type: ActionTypes.FETCH_PRODUCTS,
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
      products: [
        {
          name: "Infinix Hot 30i 4/128 GB Blue",
          price: 849.5,
          imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
          sku: "PHN-008",
          color: "Blue",
          count: 3,
        },
      ],
    });
  });
});
