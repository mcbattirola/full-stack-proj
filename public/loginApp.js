"use strict";
const e = React.createElement;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Login, null)
    );
  }
}

const domContainer = document.getElementById("root");
ReactDOM.render(e(App), domContainer);