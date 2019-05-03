"use strict";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return React.createElement(
      "div",
      {
        className: "login-container form-signin text-center"
      },
      React.createElement(LoginForm, null)
    );
  }
}
