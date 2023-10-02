import { ActionTypes } from "./actionTypes";

export const openConfirmationalModal = (
  product,
  modalId,
  handleConfirmModal,
  handleCloseModal
) => {
  const modalData = [
    {
      id: "confirm add to cart",
      header: "Add to Cart",
      closeButton: true,
      text: `Are you sure to add ${product.name} to the Cart?`,
      actions: (
        <>
          <button onClick={() => handleConfirmModal(product)}>Yes</button>
          <button onClick={handleCloseModal}>No</button>
        </>
      ),
    },

    {
      id: "confirm delete",
      header: "Add to Cart",
      closeButton: true,
      text: `Are you sure to delete ${product.name} from the Cart?`,
      actions: (
        <>
          <button onClick={() => handleConfirmModal(product)}>Yes</button>
          <button onClick={handleCloseModal}>No</button>
        </>
      ),
    },
  ];
  console.log(modalId);
  const currentModalData = modalData.find((modal) => modal.id === modalId);
  console.log(currentModalData);
  return {
    type: ActionTypes.OPEN_CONFIRM_MODAL_DATA,
    payload: currentModalData,
  };
};

export const openSuccessModal = (product, modalId, handleCloseModal) => {
  const modalData = [
    {
      id: "success add to cart",
      header: "Success message",
      text: `${product.name} has been added to your cart.`,
      closeButton: true,
      actions: <button onClick={handleCloseModal}>OK</button>,
    },
    {
      id: "success delete",
      header: "Success message",
      text: `${product.name} has been deleted from your cart.`,
      closeButton: true,
      actions: <button onClick={handleCloseModal}>OK</button>,
    },
  ];

  const currentModalData = modalData.find((modal) => modal.id === modalId);
  console.log(currentModalData);
  return {
    type: ActionTypes.OPEN_SUCCESS_MODAL_DATA,
    payload: currentModalData,
  };
};

export const closeModal = () => {
  return {
    type: ActionTypes.CLOSE_MODAL,
  };
};
