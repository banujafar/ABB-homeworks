import { ActionTypes } from "../../store/actions/actionTypes";
import { modalReducer } from "../../store/reducers/modalReducer";

describe("modalReducer", () => {
  const initialState = {
    modalData: [],
    isOpen: false,
  };

  test("should return the initial state", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalData: [],
      isOpen: false,
    });
  });
  test("should handle change  state when open modal", () => {
    expect(
      modalReducer(initialState, {
        type: ActionTypes.OPEN_CONFIRM_MODAL_DATA,
        payload: [
          {
            id: "confirm add to cart",
            header: "Add to Cart",
            closeButton: true,
            text: `Are you sure to add to the Cart?`,
            actions: {},
          },
        ],
      })
    ).toEqual({
      modalData: [
        {
          id: "confirm add to cart",
          header: "Add to Cart",
          closeButton: true,
          text: `Are you sure to add to the Cart?`,
          actions: {},
        },
      ],
      isOpen: true,
    });
  });

  test("should handle change  state when close modal", () => {
    expect(
      modalReducer(initialState, {
        type: ActionTypes.CLOSE_MODAL,
        payload: [],
      })
    ).toEqual({
      modalData: [],
      isOpen: false,
    });
  });
});
