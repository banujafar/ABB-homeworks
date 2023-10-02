import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";

const ProductCard = (props) => {
  return (
    <>
      <div className={styles["product-card"]}>
        {props.removeIcon && (
          <button className={styles["remove-icon"]} onClick={props.remove}>
            {props.removeIcon}
          </button>
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
                onClick={props.onDecrease}
              />
              {props.product.count}
              <Button
                backgroundColor={"white"}
                text="+"
                onClick={props.onIncrease}
              />
            </span>
          ) : (
            <>
              <Button
                backgroundColor={"white"}
                text="Add to Cart"
                onClick={props.onAddCart}
              />
              <Button
                backgroundColor={"white"}
                text={
                  props.favorites &&
                  !!props.favorites.length &&
                  props.favorites.some(
                    (favorite) => favorite.sku === props.product.sku
                  )
                    ? props.favoriteIcons.filled
                    : props.favoriteIcons.outlined
                }
                onClick={props.onToggleFavorites}
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
