import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

const supportsHistory = 'pushState' in window.history;
const Application = withRouter(App)
ReactDOM.render(
    <Router forceRefresh={!supportsHistory}>
        <Application />
    </Router>
    , 
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
