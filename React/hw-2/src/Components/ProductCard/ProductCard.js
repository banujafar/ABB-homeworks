import React, { useEffect, useRef, useState, createRef } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";
import Modal from "../Modal/Modal";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={styles["product-card"]}>
          <img
            src={this.props.product.imagePath}
            alt={this.props.product.name}
          />
          <h3>{this.props.product.name}</h3>
          <p>Color: {this.props.product.color}</p>
          <div className={styles["product-info"]}>
            <span>{this.props.product.price}</span>
            <Button
              backgroundColor={"white"}
              text={"Add to Cart"}
              onClick={this.props.onAddCart}
            />
            <Button
              backgroundColor={"white"}
              text={
                this.props.favorites.some(
                  (favorite) => favorite.sku === this.props.product.sku
                )
                  ? this.props.favoriteIcons.filled
                  : this.props.favoriteIcons.outlined
              }
              onClick={this.props.onToggleFavorites}
            />
          </div>
        </div>
      </>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
