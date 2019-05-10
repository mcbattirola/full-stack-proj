import React, { Component } from "react";
import CrudTitle from "../components/crudTitle";
import { toast } from "react-toastify";

class ContactCrud extends Component {
  state = {
    name: "",
    kt: "",
    account: "",
    loaded: true,
    new: true,
    formEnabled: true,
    successToastTime: 2000
  };

  updateNameValue = evt => {
    this.setState({
      name: evt.target.value
    });
  };

  updateAccountValue = evt => {
    this.setState({
      account: evt.target.value
    });
  };

  updateKtValue = evt => {
    this.setState({
      kt: evt.target.value
    });
  };

  handleButtonClick = async () => {
    this.enableForm(false);
    const fetchMethod = this.state.new ? "post" : "put";
    try {
      let result = await fetch("/api/users/self/contacts", {
        method: fetchMethod,
        headers: this.getHeader(),
        body: this.getBodyFromForm()
      });
      result = await result.json();

      this.setState({
        fail: false
      });
      toast.success("Contact successfully created!", {
        position: "top-right",
        autoClose: this.state.successToastTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      setTimeout(() => {
        window.location.href = "/contacts";
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

  getBodyFromForm = function() {
    return JSON.stringify({
      name: this.state.name || "",
      kt: this.state.kt || "",
      account: this.state.account || "",
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

  enableForm = state => {
    this.setState({
      formEnabled: state
    });
  };

  render() {
    if (!this.state.loaded) {
      return <h1>loading!</h1>;
    }

    const newContact = this.state.new;
    console.log("render, new? ", newContact);
    const title = newContact ? "New Contact" : "Edit - " + this.state.name;
    const buttomText = newContact ? "Create" : "Save";
    return (
      <React.Fragment>
        <CrudTitle title={title} backUrl="/contacts" />
        <div className="modal-body crud-form mb-2">
          <form>
            <div className="form-group">
              <label htmlFor="inputCreditCardName">Name</label>
              <input
                type="text"
                id="inputCreditCardName"
                className="form-control"
                placeholder="John Doe"
                value={this.state.name}
                onChange={this.updateNameValue}
                autoComplete="off"
                maxLength="255"
                disabled={!this.state.formEnabled ? "disabled" : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCreditCardNumber">Kt</label>
              <input
                type="text"
                id="inputCreditCardNumber"
                className="form-control"
                placeholder="00000000"
                value={this.state.kt}
                onChange={this.updateKtValue}
                autoComplete="off"
                maxLength="8"
                disabled={!this.state.formEnabled ? "disabled" : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCreditCardNumber">Account Number</label>
              <input
                type="text"
                id="inputCreditCardNumber"
                className="form-control"
                placeholder="00000000"
                value={this.state.account}
                onChange={this.updateAccountValue}
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
            {newContact ? (
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

export default ContactCrud;
