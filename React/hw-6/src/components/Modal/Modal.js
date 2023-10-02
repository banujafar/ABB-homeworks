import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div className={styles["modal"]} data-testid="modal">
        <div className={styles["modal-top"]}>
          <span className={styles["close-button"]} onClick={props.onClose}>
            x
          </span>

          <div className={styles["header"]} data-testid="modal-header">
            {props.header}
          </div>
        </div>

        <div className={styles["modal-bottom"]}>
          <div className={styles["text"]} data-testid="modal-text">
            {props.text}
          </div>
          <div className={styles["actions"]}>{props.actions}</div>
        </div>
      </div>
      <div className={styles["transparent"]} onClick={props.onClose}></div>
    </>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  closeButton: PropTypes.bool,
  text: PropTypes.string,
};

export default Modal;
