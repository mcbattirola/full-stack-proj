import React from "react";
import Navbar from "../components/navbar";
import HomeMenu from "../components/homeMenu";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user: {
        balance: ""
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    if (!token) window.location.href = "/";

    fetch("/api/users/self", {
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
            user: result
          });
          console.log("user: \n", result);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleTransferClick = () => {
    window.location.href = "/transfer";
  };

  render() {
    console.log("render chamado, loaded: ", this.state.loaded);
    return (
      <React.Fragment>
        <div className="container balance-container">
          <div className="">
            {this.state.loaded ? (
              <React.Fragment>
                <div className="col-12 balance text-center">
                  $ {this.state.user.balance.toFixed(2)}
                </div>
                <div
                  className="col-12 transfer text-center"
                  onClick={this.handleTransferClick}
                >
                  Transfer Now
                </div>
              </React.Fragment>
            ) : (
              <h1> loading</h1>
            )}
          </div>
        </div>
        <div className="container menu-container">
          <HomeMenu />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
