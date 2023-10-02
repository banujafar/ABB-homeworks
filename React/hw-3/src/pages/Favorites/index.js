import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ProductList from "../../components/ProductList/ProductList";
import { Link, useLocation } from "react-router-dom";
const Favorites = (props) => {
  return props.favorites && props.favorites.length !== 0 ? (
    <ProductList
      products={props.favorites}
      favoriteIcons={{
        outlined: <AiOutlineStar />,
        filled: <AiFillStar />,
      }}
      favorites={props.favorites}
      onToggleFavorites={props.onToggleFavorites}
      onAddCart={props.onAddCart}
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
export default Favorites;
