import React, { Component } from "react";

class ContactInfo extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h2> {this.props.name}</h2>
        <div className="container">
          <div className="col-12">{this.props.name}</div>
          <div className="col-12">{this.props.kt}</div>
          <div className="col-12">{this.props.account}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactInfo;
