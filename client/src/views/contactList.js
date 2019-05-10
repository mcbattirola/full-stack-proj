import React, { Component } from "react";
import ContactComponent from "../components/contactComponent";
import AddContact from "../components/addContact";
import CrudTitle from "../components/crudTitle";

class CreditCardList extends Component {
  state = { contacts: [] };

  async componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";

    let result = await fetch("/api/users/self/contacts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });
    result = await result.json();

    this.setState({
      loaded: true,
      contacts: result
    });
    console.log("cards: \n", result);
  }

  render() {
    return (
      <React.Fragment>
        <CrudTitle title="Contacts" />
        <div className="container crud-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <AddContact />
            </div>
            {this.state.contacts.map(contact => (
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-4"
                onClick={this.handleContactClick}
              >
                <ContactComponent
                  key={contact._id}
                  _id={contact._id}
                  name={contact.name}
                  number={contact.number}
                  account={contact.account}
                  kt={contact.kt}
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
