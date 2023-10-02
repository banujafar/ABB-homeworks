const initialState = {
  modalData: [],
  isOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_CONFIRM_MODAL_DATA":
      return {
        ...state,
        modalData: action.payload,
        isOpen: true,
      };

    case "OPEN_SUCCESS_MODAL_DATA":
      return {
        ...state,
        isOpen: true,
        modalData: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalData: [],
        isOpen: false,
      };

    default:
      return state;
  }
};
