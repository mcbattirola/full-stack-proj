import React, { Component } from "react";
class AddContact extends Component {
  state = {};
  handleClick = () => {
    window.location.href = "/contacts/contact/";
  };
  render() {
    return (
      <div
        className="credit-card-coponent text-center align-items-center credit-card-add"
        onClick={this.handleClick}
      >
        <h2>Register Contact</h2>
      </div>
    );
  }
}

export default AddContact;
