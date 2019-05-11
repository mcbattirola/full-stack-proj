import React, { Component } from "react";
import CrudTitle from "../components/crudTitle";
import Moment from "react-moment";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfers: [],
      loaded: false
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";

    let result = await fetch("/api/users/self/transfers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });
    result = await result.json();
    console.log(result);
    this.setState({
      loaded: true,
      transfers: result
    });
  }

  render() {
    if (!this.state.loaded) {
      return <h1>loading</h1>;
    }
    return (
      <React.Fragment>
        <CrudTitle title="Transfer History" />
        <div className="container">
          {this.state.transfers ? (
            this.state.transfers.map(transfer => (
              <span
                className={
                  transfer.received ? "transfer-plus" : "transfer-minus"
                }
              >
                <div className="row transfer-row">
                  <div className="col-12 col-sm-12 col-md-4">
                    {transfer.date}
                  </div>
                  <div className="col-12 col-sm-12 col-md-8">
                    {transfer.amount}${" "}
                    {transfer.received ? " received from " : " sent to "}
                    {transfer.transferReceiver}
                  </div>
                </div>
              </span>
            ))
          ) : (
            <h1>No transfers</h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default History;
