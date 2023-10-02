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
          removeIcon={props.removeIcon}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imagePath: PropTypes.string,
      color: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
export default ProductList;
