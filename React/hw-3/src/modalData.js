export const getModalData = (handleConfirmModal,handleCloseModal,product) => [
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
