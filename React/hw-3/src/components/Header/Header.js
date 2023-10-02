import { AiFillStar } from "react-icons/ai";
import { BsBasket2Fill } from "react-icons/bs";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
const Header = (props) => {
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
          <span>Favorites: {props.favoritesCount}</span>
        </li>
      </Link>
      <Link to="/cart">
        <li className={styles["list-item"]}>
          <BsBasket2Fill />
          <span>Cart: {props.cartCount}</span>
        </li>
      </Link>
    </ul>
  );
};
export default Header;
