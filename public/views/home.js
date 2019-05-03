"use strict";

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
    let token = window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    );

    //remove a # from url
    if (token.slice(-1) == "#") token = token.substring(0, token.length - 1);

    fetch("http://localhost:3000/api/users/self", {
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

  render() {
    console.log("render chamado, loaded: ", this.state.loaded);
    if (!this.state.loaded) {
      return React.createElement(
        "div",
        {
          className: "balance-container spinner-border text-light",
          role: "status"
        },
        React.createElement(
          "span",
          {
            className: "sr-only"
          },
          "Loading..."
        )
      );
    }
    return React.createElement(
      "div",
      {
        className: "container balance-container"
      },
      React.createElement(
        "div",
        {
          className: ""
        },
        React.createElement(
          "div",
          {
            className: "col-12 balance text-center"
          },
          " Balance: " + this.state.user.balance
        ),
        React.createElement(
          "div",
          {
            className: "col-12 transfer text-center"
          },
          " Transfer Now "
        )
      )
    );
  }
}
