"use strict";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return React.createElement(
      "div",
      {
        className: "container balance-container"
      },
      React.createElement(
        "div",
        {
          className: ""
        },
        React.createElement(
          "div",
          {
            className: "col-12 balance text-center"
          },
          " Balance: 10000,50 "
        ),
        React.createElement(
          "div",
          {
            className: "col-12 transfer text-center"
          },
          " Transfer Now "
        )
      )
    );
  }
}
