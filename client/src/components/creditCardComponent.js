import React, { Component } from "react";
class CreditCardComponent extends Component {
  state = {};

  handleCardClick = evt => {
    window.location.href = "/credit_cards/card/" + this.props._id;
  };

  render() {
    return (
      <div
        className="credit-card-coponent text-center"
        onClick={this.handleCardClick}
      >
        <h3>{this.props.name}</h3>
        <div>Number: {this.props.number}</div>
      </div>
    );
  }
}

export default CreditCardComponent;
