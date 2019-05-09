import React, { Component } from "react";
import CrudTitle from "../components/crudTitle";
import { toast } from "react-toastify";

class CreditCardNew extends Component {
  state = {
    name: "",
    number: ""
  };

  handleCreate = () => {
    const token = localStorage.getItem("TOKEN");
    const jsonBody = JSON.stringify({
      name: this.state.name || "",
      number: this.state.number || ""
    });

    fetch("/api/users/self/creditCards", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: jsonBody
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          fail: false
        });
        toast.success("Credit Card successfully created!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });

        setTimeout(() => {
          window.location.href = "/credit_cards";
        }, 3000);
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

  updateNameValue = evt => {
    this.setState({
      name: evt.target.value
    });
  };

  updateNumberValue = evt => {
    this.setState({
      number: evt.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <CrudTitle title="New Credit Card" />
        <div className="modal-body crud-form mb-2">
          <form>
            <div className="form-group">
              <label htmlFor="inputCreditCardName">Name</label>
              <input
                type="text"
                id="inputCreditCardName"
                className="form-control"
                placeholder="My new credit card"
                value={this.state.name}
                onChange={this.updateNameValue}
                autoComplete="off"
                maxLength="255"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCreditCardNumber">Number</label>
              <input
                type="text"
                id="inputCreditCardNumber"
                className="form-control"
                placeholder="00000000"
                value={this.state.number}
                onChange={this.updateNumberValue}
                autoComplete="off"
                maxLength="8"
              />
            </div>
            <button
              type="button"
              className="btn btn-confirm"
              onClick={this.handleCreate}
            >
              Create
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreditCardNew;
