import React, { Component } from "react";
import CrudTitle from "../components/crudTitle";
import { toast } from "react-toastify";

class CreditCardNew extends Component {
  state = {
    name: "",
    number: "",
    loaded: false,
    new: true,
    formEnabled: true,
    successToastTime: 2000
  };

  async componentDidMount() {
    const id = this.getIdFromUrl();
    if (id) {
      this.setState({
        new: false
      });
      const token = localStorage.getItem("TOKEN");
      if (!token) window.location.href = "/";

      let result = await fetch("/api/users/self/creditCards/" + id, {
        method: "GET",
        headers: this.getHeader()
      });
      result = await result.json();
      this.setState({
        loaded: true,
        new: false,
        name: result.name,
        number: result.number
      });
    } else {
      this.setState({
        loaded: true
      });
    }
  }

  getIdFromUrl = function() {
    let urlSplit = window.location.pathname.split("credit_cards/card/");
    if (urlSplit.length > 1 && urlSplit[1]) return urlSplit[1];
    return "";
  };

  getBodyFromForm = function() {
    return JSON.stringify({
      name: this.state.name || "",
      number: this.state.number || "",
      _id: this.getIdFromUrl()
    });
  };

  getHeader = function() {
    const token = localStorage.getItem("TOKEN");
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    };
    return header;
  };

  handleButtonClick = async () => {
    this.enableForm(false);
    const fetchMethod = this.state.new ? "post" : "put";
    try {
      let result = await fetch("/api/users/self/creditCards", {
        method: fetchMethod,
        headers: this.getHeader(),
        body: this.getBodyFromForm()
      });
      result = await result.json();

      this.setState({
        fail: false
      });
      toast.success("Credit Card successfully created!", {
        position: "top-right",
        autoClose: this.state.successToastTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      setTimeout(() => {
        window.location.href = "/credit_cards";
      }, this.state.successToastTime);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      this.enableForm(true);
      this.setState({
        fail: true
      });
    }
  };

  handleDelete = async () => {
    this.enableForm(false);
    console.log("delete called");
    const token = localStorage.getItem("TOKEN");
    const id = this.getIdFromUrl();
    if (id) {
      try {
        let result = await fetch("/api/users/self/creditCards/", {
          method: "DELETE",
          headers: this.getHeader(),
          body: JSON.stringify({
            _id: id
          })
        });
        result = await result.json();

        toast.success("Credit Card successfully deleted!", {
          position: "top-right",
          autoClose: this.state.successToastTime,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });

        setTimeout(() => {
          window.location.href = "/credit_cards";
        }, this.state.successToastTime);
      } catch (ex) {
        toast.error(ex.message, {
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
      }
    }
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

  enableForm = state => {
    this.setState({
      formEnabled: state
    });
  };

  render() {
    if (!this.state.loaded) {
      return <h1>loading!</h1>;
    }

    const newCard = this.state.new;
    console.log("render, new? ", newCard);
    const title = newCard ? "New Credit Card" : "Edit - " + this.state.name;
    const buttomText = newCard ? "Create" : "Save";
    return (
      <React.Fragment>
        <CrudTitle title={title} backUrl="/credit_cards" />
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
                disabled={!this.state.formEnabled ? "disabled" : ""}
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
                disabled={!this.state.formEnabled ? "disabled" : ""}
              />
            </div>

            <button
              type="button"
              className="btn btn-confirm"
              onClick={this.handleButtonClick}
              disabled={!this.state.formEnabled ? "disabled" : ""}
            >
              {buttomText}
            </button>
            {newCard ? (
              ""
            ) : (
              <button
                type="button"
                className="btn btn-warning btn-space"
                onClick={this.handleDelete}
                disabled={!this.state.formEnabled ? "disabled" : ""}
              >
                Delete
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreditCardNew;
