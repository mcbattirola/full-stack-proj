import React, { Component } from "react";
import CrudTitle from "../components/crudTitle";
import TransferForm from "../components/transferForm";
import ContactList from "../components/contactList.js";

class Transfer extends Component {
  state = {
    contactList: [],
    loaded: false
  };
  async componentDidMount() {
    try {
      const contacts = await fetch("/api/users/self/contacts", {
        method: "GET",
        headers: this.getHeader()
      });
      this.setState({
        contactList: contacts,
        loaded: true
      });
    } catch (ex) {
      this.setState({
        loaded: true
      });
    }
  }

  getHeader = function() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    };
    return header;
  };

  state = {};
  render() {
    return (
      <React.Fragment>
        <CrudTitle title="Transfer" />
        <div className="h100">
          <div className="container text-center h100">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 ">
                <TransferForm />
              </div>
              <div className="col-12 col-sm-12 col-md-6 crud-form-transfer contact-list">
                <h2>Contact List</h2>
                {this.state.loaded ? (
                  <ContactList contactList={this.state.contacts} />
                ) : (
                  <h2>Loading</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transfer;
