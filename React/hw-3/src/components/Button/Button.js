import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
const Button = (props) => {
  const buttonStyle = {
    backgroundColor: props.backgroundColor,
  };
  return (
    <button
      onClick={props.onClick}
      style={buttonStyle}
      className={`${styles.button} ${props.backgroundColor}`}
    >
      {props.text}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: "",
  className: "",
};
export default Button;
