import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";
import Home from "./views/home";
import Login from "./views/login";
import CreditCardList from "./views/creditCardList";
import CreditCardNew from "./views/creditCardNew";
import ContactCrud from "./views/contactCrud";
import History from "./views/history";
import ContactList from "./views/contactList";
import Transfer from "./views/transfer";
import Navbar from "./components/navbar";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login />} />
          <PrivateRoute
            path="/app"
            component={() => (
              <React.Fragment>
                <Navbar />
                <Home />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            exact
            path="/credit_cards"
            component={() => (
              <React.Fragment>
                <Navbar />
                <CreditCardList />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            path="/credit_cards/card"
            component={() => (
              <React.Fragment>
                <Navbar />
                <CreditCardNew />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            exact
            path="/contacts"
            component={() => (
              <React.Fragment>
                <Navbar />
                <ContactList />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            path="/contacts/contact"
            component={() => (
              <React.Fragment>
                <Navbar />
                <ContactCrud />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            path="/history"
            component={() => (
              <React.Fragment>
                <Navbar />
                <History />
              </React.Fragment>
            )}
          />
          <PrivateRoute
            path="/transfer"
            component={() => (
              <React.Fragment>
                <Navbar />
                <Transfer />
              </React.Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

//todo: make new file with this component
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default Routes;
