import ProductList from "../../components/ProductList/ProductList";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
const Cart = (props) => {
  return props.cart && props.cart.length !== 0 ? (
    <ProductList
      products={props.cart}
      removeIcon={<FaTimes />}
      onIncrease={props.onIncrease}
      onDecrease={props.onDecrease}
      remove={props.remove}
    />
  ) : (
    <div>
      <h2>No found product</h2>
      <Link to={-1}>
        <span>Go back</span>
      </Link>
    </div>
  );
};
export default Cart;
