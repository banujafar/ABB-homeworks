import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal/Modal";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import { closeModal } from "./store/actions/modal";
import Home from "./pages/Home/Home";
import { fetchProducts } from "./store/actions/products";

const App = () => {
  const { modalData, isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="App">
      <Router>
        <Header />
        {isOpen && modalData && (
          <Modal
            closeButton={modalData.closeButton}
            header={modalData.header}
            text={modalData.text}
            onClose={handleCloseModal}
            actions={modalData.actions}
          />
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<div>404 Not found Page</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
