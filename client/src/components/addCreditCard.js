import React, { Component } from "react";
class AddCreditCard extends Component {
  state = {};
  handleClick = () => {
    window.location.href = "/credit_cards/card/";
  };
  render() {
    return (
      <div
        className="credit-card-coponent text-center align-items-center credit-card-add"
        onClick={this.handleClick}
      >
        <h2>Register New Card</h2>
      </div>
    );
  }
}

export default AddCreditCard;
