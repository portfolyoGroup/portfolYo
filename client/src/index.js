import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const render = (Component) =>
  ReactDOM.render(<Component />, document.getElementById("root"));

render(App);