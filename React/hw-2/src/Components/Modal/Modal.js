import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.closeButton && (
        <div className={styles["transparent"]} onClick={this.props.onClose}>
          <div className={styles["modal"]}>
            <div className={styles["modal-top"]}>
              <span
                className={styles["close-button"]}
                onClick={this.props.onClose}
              >
                x
              </span>
              <div className={styles["header"]}>{this.props.header}</div>
            </div>

            <div className={styles["modal-bottom"]}>
              <div className={styles["text"]}>{this.props.text}</div>
              <div className={styles["actions"]}>{this.props.actions}</div>
            </div>
          </div>
        </div>
      )
    );
  }
}
Modal.propTypes = {
  header: PropTypes.string.isRequired,
  closeButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
export default Modal;
