import React from "react";
import PropTypes from "prop-types";
import styles from "./ProductList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
const ProductList = (props) => {
  return (
    <div className={styles["product-list"]}>
      {props.products.map((product, index) => (
        <ProductCard
          product={product}
          key={index}
          onAddCart={() => props.onAddCart(product)}
          onToggleFavorites={() => props.onToggleFavorites(product)}
          favoriteIcons={props.favoriteIcons}
          favorites={props.favorites}
          removeIcon={props.removeIcon}
          onIncrease={() => props.onIncrease(product)}
          onDecrease={() => props.onDecrease(product)}
          remove={() => props.remove(product)}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      color: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
export default ProductList;
