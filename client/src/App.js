import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
