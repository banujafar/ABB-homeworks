import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { getModalData } from "./modalData";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      modalData: [],
    };
  }

  modalData = getModalData(this.handleCloseModal);

  handleOpenModal = (index) => {
    this.setState({ isOpen: true, modalData: this.modalData[index] });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false, modalData: [] });
  };

  render() {
    return (
      <>
        <Button
          text="Open first modal"
          backgroundColor="red"
          onClick={() => this.handleOpenModal(0)}
        />
        <Button
          text="Open second modal"
          backgroundColor="green"
          onClick={() => this.handleOpenModal(1)}
        />
        {this.state.isOpen && (
          <Modal
            header={this.state.modalData.header}
            closeButton={this.state.modalData.closeButton}
            text={this.state.modalData.text}
            actions={this.state.modalData.actions}
            onClose={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}

export default App;
