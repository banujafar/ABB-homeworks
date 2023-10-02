import ProductList from "../../components/ProductList/ProductList";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const products = useSelector((state) => state.products.products);
  return products && products.length !== 0 ? (
    <ProductList products={products} />
  ) : (
    <div>
      <h2>No found product</h2>
      <Link to={-1}>
        <span>Go back</span>
      </Link>
    </div>
  );
};
export default Home;
