import React, { Component } from "react";
import { toast } from "react-toastify";

class TransferForm extends Component {
  state = {
    transferReceiver: "",
    receiverFound: false,
    accountNum: "",
    amount: 0
  };

  onBlurAccountNum = async () => {
    console.log("this.state.accountNum: ", this.state.accountNum);
    try {
      let result = await fetch("/api/users/" + this.state.accountNum, {
        method: "GET",
        headers: this.getHeader()
      });
      result = await result.json();
      this.setState({
        transferReceiver: result[0].name,
        receiverFound: true
      });
    } catch (ex) {
      this.setState({
        transferReceiver: "",
        receiverFound: false
      });
    }
  };

  handleTransfer = async () => {
    let result = await fetch("/api/transfer/", {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({
        account: this.state.accountNum || "",
        amount: this.state.amount || ""
      })
    });
    result = await result.json();
    if (!result.error) {
      toast.success("Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
    } else {
      console.log("erro:", result.error);
      toast.error(result.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
    }
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

  updateAccountNum = evt => {
    this.setState({
      accountNum: evt.target.value
    });
  };

  updateAmount = evt => {
    this.setState({
      amount: evt.target.value
    });
  };

  render() {
    return (
      <form className="transfer-form">
        <div className="form-group row">
          <label
            htmlFor="inputAccountNum"
            className="col-sm-4 col-form-label float-sm-left"
          >
            Account Number
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="inputAccountNum"
              onBlur={this.onBlurAccountNum}
              placeholder="00000000"
              value={this.state.accountNum}
              onChange={this.updateAccountNum}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputValue"
            className="col-sm-4 col-form-label float-sm-left"
          >
            Transfer Amount
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="inputValue"
              value={this.state.amount}
              onChange={this.updateAmount}
              placeholder="100"
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputDescription"
            className="col-sm-4 col-form-label float-sm-left"
          >
            Comment
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="inputDescription"
              placeholder="Paying rent"
            />
          </div>
        </div>
        {this.state.receiverFound ? (
          <div
            className="text-center h3 btn btn-confirm"
            onClick={this.handleTransfer}
          >
            Send to {this.state.transferReceiver}
          </div>
        ) : (
          <div className="btn btn-danger">Account not found. </div>
        )}
      </form>
    );
  }
}

export default TransferForm;
