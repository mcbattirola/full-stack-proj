import React, { Component } from "react";

class CrudTitle extends Component {
  state = {};

  handleBack = () => {
    window.history.back();
    console.log("back clicked");
  };

  render() {
    return (
      <div className="container title-container">
        <div className="row align-items-center">
          <div className="col-12 col-sm-1 crud-back" onClick={this.handleBack}>
            Back
          </div>
          <div className="col-12 col-sm-11 crud-title h1 text-center">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}

export default CrudTitle;
