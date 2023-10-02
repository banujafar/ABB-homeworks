import React, { useState } from "react";
import "./App.css";
import ProductList from "./Components/ProductList/ProductList";
import { fetchData } from "./api";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";
import { Header } from "./Components/Header/Header";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      modal: [],
      cart: [],
      isOpen: false,
      favorites: [],
    };
  }
  componentDidMount() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        this.setState({ cart: JSON.parse(cart) });
      } catch (error) {
        console.error("Error parsing cart data from local storage:", error);
      }
    }
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      try {
        this.setState({ favorites: JSON.parse(favorites) });
      } catch (error) {
        console.error(
          "Error parsing favorites data from local storage:",
          error
        );
      }
    }
    fetchData().then((data) => this.setState({ products: data }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
    if (prevState.favorites !== this.state.favorites) {
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }
  }
  handleFavorites = (product) => {
    if (this.state.favorites.includes(product)) {
      const filteredFavorites = this.state.favorites.filter(
        (favorite) => favorite.sku !== product.sku
      );
      this.setState({ favorites: filteredFavorites });
    } else {
      this.setState({ favorites: [...this.state.favorites, product] });
    }
  };
  handleAddCart = (product) => {
    this.setState({
      isOpen: true,
      modal: {
        header: "Add to Cart",
        closeButton: true,
        text: `Are you sure to add ${product.name} to the Cart?`,
        actions: (
          <>
            <Button
              backgroundColor="white"
              text="Yes"
              onClick={() => this.handleConfirmModal(product)}
            />
            <Button
              backgroundColor="white"
              text="No"
              onClick={this.handleCloseModal}
            />
          </>
        ),
      },
    });
  };
  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };
  handleConfirmModal = (product) => {
    this.setState(
      (prevState) => ({ cart: [...prevState.cart, product] }),
      () => {
        this.setState({
          isOpen: true,
          modal: {
            header: "Added to Cart",
            closeButton: true,
            text: `${product.name} has been added to your cart.`,
            actions: (
              <Button
                backgroundColor="white"
                text="OK"
                onClick={this.handleCloseModal}
              />
            ),
          },
        });
      }
    );
  };

  render() {
    const { products, cart, modal, favorites, isOpen } = this.state;
    return (
      <div className="App">
        <Header cartCount={cart.length} favoritesCount={favorites.length} />
        <ProductList
          products={products}
          onAddCart={this.handleAddCart}
          onToggleFavorites={this.handleFavorites}
          favoriteIcons={{
            outlined: <AiOutlineStar />,
            filled: <AiFillStar />,
          }}
          favorites={favorites}
        />
        {isOpen && (
          <Modal
            closeButton={modal.closeButton}
            header={modal.header}
            text={modal.text}
            onClose={this.handleCloseModal}
            actions={modal.actions}
          />
        )}
      </div>
    );
  }
}
export default App;
