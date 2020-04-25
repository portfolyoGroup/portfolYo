import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@ionic/react/css/core.css';

const render = (Component) =>
  ReactDOM.render(<Component />, document.getElementById("root"));

render(App);