"use strict";

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "footer",
      {
        className: "mastfoot text-center container container-foot"
      },
      React.createElement(
        "div",
        {
          className: "row"
        },
        React.createElement(
          "div",
          {
            className: "col-12 col-sm-4 col-md4 footer-cards"
          },
          "History"
        ),
        React.createElement(
          "div",
          {
            className: "col-12 col-sm-4 col-md4 footer-cards"
          },
          "Contacts"
        ),
        React.createElement(
          "div",
          {
            className: "col-12 col-sm-4 col-md4 footer-cards"
          },
          "My Credit Cards"
        )
      )
    );
  }
}
