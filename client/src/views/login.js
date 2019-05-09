import React from "react";
import "../App.css";
import SignUpModal from "../components/signUpModal";
import { ToastContainer, toast } from "react-toastify";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      fail: false,
      signUpFormState: {
        email: "",
        password: "",
        name: "NOME TESTE 321 123",
        kt: ""
      }
    };
  }

  handleLogin = () => {
    fetch("/api/auth/", {
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
        this.setState({
          fail: false
        });
        localStorage.setItem("TOKEN", result.token);
        window.location.href = "/app/";
      })
      .catch(error => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
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
    return (
      <React.Fragment>
        <div className="login-container form-signin text-center">
          <form className="form-signin">
            <h1 className="login-logo">Ekki</h1>
            <h1 className="h3 mb-3 font-weight-normal login-title">
              Please sign in
            </h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.updateEmailValue}
              autoComplete="current-password"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.updatePasswordValue}
              autoComplete="current-password"
            />
            <button
              className="btn btn-lg btn-block btn-confirm"
              type="button"
              onClick={() => {
                this.handleLogin();
              }}
            >
              Sign in
            </button>
            <button
              className="btn btn-lg btn-block btn-create_acc"
              type="button"
              // onClick={() => {
              //   this.handleCreateAccount();
              // }}
              data-toggle="modal"
              data-target="#createAccountModal"
            >
              Create Account
            </button>
            <p className="mt-5 mb-3 text-muted login-under">© 2019</p>
          </form>
        </div>

        <SignUpModal id="createAccountModal" />
      </React.Fragment>
    );
  }
}

export default Login;
