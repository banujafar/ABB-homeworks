import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./ProductTable.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal,
  openConfirmationalModal,
  openSuccessModal,
} from "../../store/actions/modal";
import {
  cartProducts,
  decreaseCartProducts,
  handleCheckedProducts,
  increaseCartProducts,
  removeCart,
} from "../../store/actions/cartProducts";
import { favoriteProducts } from "../../store/actions/favoritesProducts";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductTable = ({ products, removeIcon }) => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      openConfirmationalModal(
        product,
        "confirm add to cart",
        handleConfirmModal,
        handleCloseModal
      )
    );
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleConfirmModal = (product) => {
    dispatch(cartProducts(product));
    dispatch(
      openSuccessModal(product, "success add to cart", handleCloseModal)
    );
  };

  const handleIncrease = (product) => {
    dispatch(increaseCartProducts(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseCartProducts(product));
  };

  const handleRemove = (product) => {
    dispatch(
      openConfirmationalModal(
        product,
        "confirm delete",
        handleConfirmRemoveModal,
        handleCloseModal
      )
    );
  };

  const handleConfirmRemoveModal = (product) => {
    dispatch(removeCart(product));
    dispatch(openSuccessModal(product, "success delete", handleCloseModal));
  };

  const handleFavorites = (product) => {
    dispatch(favoriteProducts(product));
  };

  const handleChangeChecked = (product) => {
    dispatch(handleCheckedProducts(product));
  };

  return (
    <table className={styles["product-table"]} data-testid="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Color</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.sku} data-testid="product-row">
            <td>
              <img src={product.imagePath} alt={product.name} />
            </td>
            <td>{product.name}</td>
            <td>{product.color}</td>
            <td>{product.price}</td>
            <td>
              <Button
                backgroundColor={"white"}
                text="Add to Cart"
                onClick={() => handleAddToCart(product)}
              />
              {favorites &&
              !!favorites.length &&
              favorites.some((favorite) => favorite.sku === product.sku) ? (
                <Button
                  backgroundColor={"white"}
                  text={<AiFillStar />}
                  onClick={() => handleFavorites(product)}
                />
              ) : (
                <Button
                  backgroundColor={"white"}
                  text={<AiOutlineStar />}
                  onClick={() => handleFavorites(product)}
                />
              )}
              {removeIcon && (
                <>
                  <Button
                    backgroundColor={"white"}
                    text="-"
                    onClick={() => handleDecrease(product)}
                  />
                  <span data-testid="count">{product.count}</span>
                  <Button
                    backgroundColor={"white"}
                    text="+"
                    onClick={() => handleIncrease(product)}
                  />
                  <Button
                    backgroundColor={"white"}
                    text="Remove"
                    onClick={() => handleRemove(product)}
                  />
                  <input
                    type="checkbox"
                    checked={product.checked || false}
                    onChange={() => handleChangeChecked(product)}
                  />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.number.isRequired,
      imagePath: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      count: PropTypes.number,
      checked: PropTypes.bool,
    })
  ).isRequired,
};

export default ProductTable;
