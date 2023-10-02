import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles["product-list"]}>
        {this.props.products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
            onAddCart={() => this.props.onAddCart(product)}
            onToggleFavorites={() => this.props.onToggleFavorites(product)}
            favoriteIcons={this.props.favoriteIcons}
            favorites={this.props.favorites}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
      color: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default ProductList;
