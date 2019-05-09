import React, { Component } from "react";
import CreditCardComponent from "../components/creditCardComponent";
import AddCreditCard from "../components/addCreditCard";
import CrudTitle from "../components/crudTitle";

class CreditCardList extends Component {
  state = { creditCards: [] };

  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";

    fetch("/api/users/self/creditCards", {
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
            creditCards: result
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
        <CrudTitle title="Credit Cards" />
        <div className="container crud-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
              <AddCreditCard />
            </div>
            {this.state.creditCards.map(card => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4"
                onClick={this.handleCardClick}
              >
                <CreditCardComponent
                  key={card._id}
                  _id={card._id}
                  name={card.name}
                  number={card.number}
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
