import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";
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

const ProductCard = (props) => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleAddCart = (product) => {
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
    <>
      <div className={styles["product-card"]} data-testid="product-cart">
        {props.removeIcon && (
          <>
            <button
              className={styles["remove-icon"]}
              onClick={() => handleRemove(props.product)}
              data-testid="remove-product"
            >
              {props.removeIcon}
            </button>
            <input
              type="checkbox"
              checked={props.product.checked || false}
              onChange={() => handleChangeChecked(props.product)}
            />
          </>
        )}
        <img src={props.product.imagePath} alt={props.product.name} />
        <h3>{props.product.name}</h3>
        <p> Color: {props.product.color}</p>
        <div className={styles["product-info"]}>
          <span>{props.product.price}</span>
          {props.removeIcon ? (
            <span>
              <Button
                backgroundColor={"white"}
                text="-"
                onClick={() => handleDecrease(props.product)}
              />
              <span data-testid="count">{props.product.count}</span>
              <Button
                backgroundColor={"white"}
                text="+"
                onClick={() => handleIncrease(props.product)}
              />
            </span>
          ) : (
            <>
              <Button
                backgroundColor={"white"}
                text="Add to Cart"
                onClick={() => handleAddCart(props.product)}
              />
              <Button
                backgroundColor={"white"}
                text={
                  favorites &&
                  !!favorites.length &&
                  favorites.some(
                    (favorite) => favorite.sku === props.product.sku
                  ) ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )
                }
                onClick={() => handleFavorites(props.product)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProductCard;
