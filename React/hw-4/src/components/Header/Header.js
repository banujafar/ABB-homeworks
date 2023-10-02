import { AiFillStar } from "react-icons/ai";
import { BsBasket2Fill } from "react-icons/bs";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { count } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <ul className={styles["list-container"]}>
      <Link to="/">
        <li className={styles["list-item"]}>
          <span>Home</span>
        </li>
      </Link>
      <Link to="/favorites">
        <li className={styles["list-item"]}>
          <AiFillStar />
          <span>Favorites: {favorites.length}</span>
        </li>
      </Link>
      <Link to="/cart">
        <li className={styles["list-item"]}>
          <BsBasket2Fill />
          <span>Cart: {count}</span>
        </li>
      </Link>
    </ul>
  );
};
export default Header;
