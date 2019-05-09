import React, { Component } from "react";
class CreditCardComponent extends Component {
  state = {};
  render() {
    return (
      <div className="credit-card-coponent text-center">
        <h3>{this.props.name}</h3>
        <div>Number: {this.props.number}</div>
      </div>
    );
  }
}

export default CreditCardComponent;
