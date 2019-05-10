import React, { Component } from "react";
import CreditCardComponent from "../components/creditCardComponent";
import AddContact from "../components/addContact";
import CrudTitle from "../components/crudTitle";

class CreditCardList extends Component {
  state = { contacts: [] };

  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";

    fetch("/api/users/self/contacts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loaded: true,
            contacts: result
          });
          console.log("cards: \n", result);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    return (
      <React.Fragment>
        <CrudTitle title="Contacts" />
        <div className="container crud-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
              <AddContact />
            </div>
            {this.state.contacts.map(contact => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4"
                onClick={this.handleContactClick}
              >
                <contactComponent
                  key={contact._id}
                  _id={contact._id}
                  name={contact.name}
                  number={contact.number}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreditCardList;
