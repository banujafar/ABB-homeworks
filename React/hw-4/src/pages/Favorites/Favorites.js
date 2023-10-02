import ProductList from "../../components/ProductList/ProductList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return favorites && favorites.length !== 0 ? (
    <ProductList products={favorites} />
  ) : (
    <div>
      <h2>No found product</h2>
      <Link to={-1}>
        <span>Go back</span>
      </Link>
    </div>
  );
};
export default Favorites;
