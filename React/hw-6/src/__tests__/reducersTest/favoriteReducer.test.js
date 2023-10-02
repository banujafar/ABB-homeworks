import { ActionTypes } from "../../store/actions/actionTypes";
import { favoritesReducer } from "../../store/reducers/favoritesReducer";

describe("favoriteReducer", () => {
  const initialState = {
    favorites: [],
  };

  test("should return the initial state", () => {
    expect(favoritesReducer(undefined, {})).toEqual({
      favorites: [],
    });
  });
  test("should handle change  state", () => {
    expect(
      favoritesReducer(initialState, {
        type: ActionTypes.GET_FAVORITES_PRODUCTS,
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
      favorites: [
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
