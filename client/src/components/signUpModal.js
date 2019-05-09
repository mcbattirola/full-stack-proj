import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      kt: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: "",
      email: "",
      password: "",
      kt: ""
    });
    console.log("didmount, state:", this.state);
  }

  handleCreateAccount = () => {
    const jsonBody = JSON.stringify({
      email: this.state.email || "",
      password: this.state.password || "",
      name: this.state.name || "",
      kt: this.state.kt || ""
    });
    console.log("jsonbody:", jsonBody);
    fetch("/api/users/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: jsonBody
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          fail: false
        });
        toast.success("Account successfully created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
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

  updateNameValue = evt => {
    this.setState({
      name: evt.target.value
    });
  };

  updateKtValue = evt => {
    this.setState({
      kt: evt.target.value
    });
  };

  render() {
    return (
      <div className="modal" id={this.props.id} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="inputNameSignUp">Name</label>
                  <input
                    type="text"
                    id="inputNameSignUp"
                    className="form-control"
                    placeholder="John Doe"
                    value={this.state.name}
                    onChange={this.updateNameValue}
                    autoComplete="off"
                    maxLength="255"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputKtSignUp">KT</label>
                  <input
                    type="text"
                    id="inputKtSignUp"
                    className="form-control"
                    placeholder="00000000"
                    value={this.state.kt}
                    onChange={this.updateKtValue}
                    autoComplete="off"
                    maxLength="255"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmailSignUp">Email</label>
                  <input
                    type="email"
                    id="inputEmailSignUp"
                    className="form-control"
                    placeholder="JohnDoe@gmail.com"
                    // value={this.state.email}
                    onChange={this.updateEmailValue}
                    maxLength="255"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPasswordSignUp">Password</label>
                  <input
                    type="password"
                    id="inputPasswordSignUp"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.updatePasswordValue}
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCreateAccount}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpModal;
