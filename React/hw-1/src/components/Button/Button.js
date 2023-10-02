import React from "react";
import "./Button.scss";
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
        className={`button ${
          this.props.backgroundColor ? this.props.backgroundColor : ""
        }`}
      >
        {this.props.text}
      </button>
    );
  }
}
export default Button;
