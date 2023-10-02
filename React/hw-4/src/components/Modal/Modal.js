import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div className={styles["modal"]}>
        <div className={styles["modal-top"]}>
          <span className={styles["close-button"]} onClick={props.onClose}>
            x
          </span>

          <div className={styles["header"]}>{props.header}</div>
        </div>

        <div className={styles["modal-bottom"]}>
          <div className={styles["text"]}>{props.text}</div>
          <div className={styles["actions"]}>{props.actions}</div>
        </div>
      </div>
      <div className={styles["transparent"]} onClick={props.onClose}></div>
    </>
  );
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  closeButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Modal;
