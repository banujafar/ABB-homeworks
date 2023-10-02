import { Component } from "react";
import { AiFillStar } from "react-icons/ai";
import {BsBasket2Fill} from 'react-icons/bs';
import styles from './Header.module.scss'
export class Header extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
        <ul className={styles["list-container"]}>
            <li className={styles["list-item"]}>
                <AiFillStar/>
                <span>Favorites: {this.props.favoritesCount}</span>
            </li>
            <li className={styles["list-item"]}>
                <BsBasket2Fill/>
                <span>Cart: {this.props.cartCount}</span>
            </li>
        </ul>
    )
  }
}
