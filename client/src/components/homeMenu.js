import React, { Component } from "react";

class HomeMenu extends Component {
  state = {};
  render() {
    return (
      <div className="row text-center">
        <div className="col-12 col-sm-4 menu-item">
          <a href="/credit_cards">Credit Cards</a>
        </div>
        <div className="col-12 col-sm-4 menu-item">
          <a href="/contacts">Contacts</a>
        </div>
        <div className="col-12 col-sm-4 menu-item">
          <a href="/history/">Transfer Hystory</a>
        </div>
      </div>
    );
  }
}

export default HomeMenu;
