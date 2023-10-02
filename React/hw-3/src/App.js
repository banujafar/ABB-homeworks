import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import { fetchData } from "./api";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import { getModalData } from "./modalData";

const App = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error parsing cart data:", err);
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const data = localStorage.getItem("favorites");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error parsing cart data:", err);
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const totalCount = cart.reduce(
      (sum, cartElement) => sum + cartElement.count,
      0
    );
    setCount(totalCount);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsOpen(true);
  }, [cart, favorites]);

  const handleFavorites = (product) => {
    console.log(product);
    if (favorites.includes(product)) {
      const filteredFavorites = favorites.filter(
        (favorite) => favorite.sku !== product.sku
      );
      setFavorites(filteredFavorites);
    } else {
      setFavorites([...favorites, product]);
    }
  };
  const setModalData = (modalId, product) => {
    const modalData = getModalData(
      modalId === "confirm delete"
        ? handleConfirmRemoveModal
        : handleConfirmModal,
      handleCloseModal,
      product
    );
    const currentModalData = modalData.find(
      (modalElement) => modalElement.id === modalId
    );
    setModal(currentModalData);
  };

  const handleAddCart = (product) => {
    setModalData("confirm add to cart", product);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setModal(null);
    setIsOpen(false);
  };

  const handleConfirmModal = (product) => {
    const sameIndexElement = cart.findIndex(
      (cartElement) => cartElement.sku === product.sku
    );

    if (sameIndexElement !== -1) {
      const updatedCart = [...cart];
      updatedCart[sameIndexElement]["count"] += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, count: 1 }]);
    }
    setModalData("success add to cart", product);
  };

  const handleIncrease = (product) => {
    const productPrice = products.filter(
      (cartElement) => cartElement.sku === product.sku
    );
    const updatedCart = cart.map((cartElement) =>
      cartElement.sku === product.sku
        ? {
            ...cartElement,
            count: cartElement.count + 1,
            price: (productPrice[0].price * (cartElement.count + 1)).toFixed(2),
          }
        : cartElement
    );
    setCart(updatedCart);
  };

  const handleDecrease = (product) => {
    const productPrice = products.filter(
      (cartElement) => cartElement.sku === product.sku
    );
    if (product.count >= 2) {
      const updatedCart = cart.map((cartElement) =>
        cartElement.sku === product.sku
          ? {
              ...product,
              count: cartElement.count - 1,
              price: (productPrice[0].price * (cartElement.count - 1)).toFixed(
                2
              ),
            }
          : cartElement
      );
      setCart(updatedCart);
    }
  };

  const handleRemove = (product) => {
    setIsOpen(true);
    setModalData("confirm delete", product);
  };

  const handleConfirmRemoveModal = (product) => {
    const filteredCart = cart.filter(
      (cartElement) => cartElement.sku !== product.sku
    );
    setCart(filteredCart);
    setModalData("success delete", product);
  };

  return (
    <div className="App">
      <Router>
        <Header
          cartCount={count}
          favoritesCount={favorites.length}
          favorites={favorites}
          cart={cart}
        />
        {isOpen && modal && (
          <Modal
            closeButton={modal.closeButton}
            header={modal.header}
            text={modal.text}
            onClose={handleCloseModal}
            actions={modal.actions}
          />
        )}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProductList
                products={products}
                onAddCart={handleAddCart}
                onToggleFavorites={handleFavorites}
                favoriteIcons={{
                  outlined: <AiOutlineStar />,
                  filled: <AiFillStar />,
                }}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                onIncrease={handleIncrease}
                cart={cart}
                onDecrease={handleDecrease}
                remove={handleRemove}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorites={handleFavorites}
                onAddCart={handleAddCart}
              />
            }
          />
          <Route path="*" element={<div>404 Not found Page</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
