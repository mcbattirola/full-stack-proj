import React, { Component } from "react";
class ContactComponent extends Component {
  state = {};

  handleContactClick = evt => {
    window.location.href = "/contacts/contact/" + this.props._id;
  };

  render() {
    return (
      <div
        className="credit-card-coponent text-center"
        onClick={this.handleContactClick}
      >
        <h3>{this.props.name}</h3>
        <div>Account:{this.props.number}</div>
        <div>Kt:{this.props.kt}</div>
      </div>
    );
  }
}

export default ContactComponent;
