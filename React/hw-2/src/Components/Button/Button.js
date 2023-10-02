import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const buttonStyle = {
      backgroundColor: this.props.backgroundColor,
    };
    return (
      <button
        onClick={this.props.onClick}
        style={buttonStyle}
        className={`${styles.button} ${this.props.backgroundColor}`}
      >
        {this.props.text}
      </button>
    );
  }
}

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
