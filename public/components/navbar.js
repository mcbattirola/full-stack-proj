"use strict";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "nav",
      {
        className: "navbar navbar-expand-lg navbar-dark bg-dark"
      },
      React.createElement(
        "a",
        {
          className: "navbar-brand",
          href: "#"
        },
        "Navbar"
      ),
      React.createElement(
        "button",
        {
          className: "navbar-toggler",
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#navbarNav",
          "aria-controls": "navbarNav",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        },
        React.createElement("span", {
          className: "navbar-toggler-icon"
        })
      ),
      React.createElement(
        "div",
        {
          className: "collapse navbar-collapse",
          id: "navbarNav"
        },
        React.createElement(
          "ul",
          {
            className: "navbar-nav"
          },
          React.createElement(
            "li",
            {
              className: "nav-item active"
            },
            React.createElement(
              "a",
              {
                className: "nav-link",
                href: "#"
              },
              "Home ",
              React.createElement(
                "span",
                {
                  className: "sr-only"
                },
                "(current)"
              )
            )
          ),
          React.createElement(
            "li",
            {
              className: "nav-item"
            },
            React.createElement(
              "a",
              {
                className: "nav-link",
                href: "#"
              },
              "Features"
            )
          ),
          React.createElement(
            "li",
            {
              className: "nav-item"
            },
            React.createElement(
              "a",
              {
                className: "nav-link",
                href: "#"
              },
              "Pricing"
            )
          ),
          React.createElement(
            "li",
            {
              className: "nav-item"
            },
            React.createElement(
              "a",
              {
                className: "nav-link disabled",
                href: "#"
              },
              "Disabled"
            )
          )
        )
      )
    );
  }
}
