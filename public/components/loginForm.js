"use strict";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      fail: false
    };
  }

  handleLogin = () => {
    fetch("http://localhost:3000/api/auth/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          fail: false
        });

        window.location.href = "http://localhost:3000/main/" + result.token;
      })
      .catch(error => {
        this.setState({
          fail: true
        });
      });
  };

  updateEmailValue = evt => {
    this.setState({
      email: evt.target.value
    });
  };

  updatePasswordValue = evt => {
    this.setState({
      password: evt.target.value
    });
  };

  render() {
    return React.createElement(
      "form",
      {
        className: "form-signin"
      },
      //   React.createElement("img", {
      //     className: "mb-4",
      //     src:
      //       "https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg",
      //     alt: "",
      //     width: "72",
      //     height: "72"
      //   }),

      React.createElement("h1", { className: "login-logo" }, "Ekki"),
      React.createElement(
        "h1",
        {
          className: "h3 mb-3 font-weight-normal login-title"
        },
        "Please sign in"
      ),

      this.state.fail
        ? React.createElement(
            "h3",
            {
              className: "h4 mb-4 font-weight-normal login-fail"
            },
            "Incorrect Email or Password"
          )
        : null,
      React.createElement(
        "label",
        {
          htmlFor: "inputEmail",
          className: "sr-only"
        },
        "Email address"
      ),
      React.createElement("input", {
        type: "email",
        id: "inputEmail",
        value: this.state.email,
        onChange: this.updateEmailValue,
        className: "form-control",
        placeholder: "Email address",
        required: "",
        autoFocus: ""
      }),
      React.createElement(
        "label",
        {
          htmlFor: "inputPassword",
          className: "sr-only"
        },
        "Password"
      ),
      React.createElement("input", {
        type: "password",
        id: "inputPassword",
        value: this.state.password,
        onChange: this.updatePasswordValue,
        className: "form-control",
        placeholder: "Password",
        required: ""
      }),
      React.createElement(
        "button",
        {
          className: "btn btn-lg btn-block btn-login",
          type: "button",
          onClick: this.handleLogin
        },
        "Sign in"
      ),
      React.createElement(
        "p",
        {
          className: "mt-5 mb-3 text-muted login-under"
        },
        "\xA9 2019"
      )
    );
  }
}
