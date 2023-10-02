import ProductList from "../../components/ProductList/ProductList";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return cart && cart.length !== 0 ? (
    <ProductList products={cart} removeIcon={<FaTimes />} />
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
