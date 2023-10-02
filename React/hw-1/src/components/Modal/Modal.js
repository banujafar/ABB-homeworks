import React, { useState } from "react";
import "./Modal.scss";
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="transparent" onClick={this.props.onClose}>
        <div className="modal">
          <div className="modal-top">
            <span className="close-button">x</span>
            <div className="header">{this.props.header}</div>
          </div>
          <div className="modal-bottom">
            <div className="text">{this.props.text}</div>
            <div className="actions" onClick={this.props.onClose}>
              {this.props.actions}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
