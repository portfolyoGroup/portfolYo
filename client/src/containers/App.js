import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import About from '../components/About';
import withAuthentication from '../containers/withAuthentication';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Register from '../components/Register/Register'
// import Error404 from '../components/Error404'
import './App.css';
import PropTypes from 'prop-types';
import { background, logo } from '../resources/images'


const App = ({ location }) => {

  const [currentBackground, setBackground] = useState(background)

  useEffect(() => {
    const path = location.pathname.split('/')[1] || '/';
    if (path === '/' || path === 'register') {
      setBackground(background)
    }
    else {
      setBackground(null)
    }
  }, [location])

  return (
    <div style={{ width:'100%', height: '100%' }}>
      <img style={currentBackground && {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        alt: '',
        backgroundSize: 'cover',
        filter: `blur(10px)`,
        backgroundImage: `url(${currentBackground})`
      }} />
      <div style={{ height: '40%' }}>
        <img src={logo} style={{
          height: '100%',
          alt: 'PortfolYo!',
          zIndex: 1, position: 'relative', left: '30%'
        }} />
      </div>
      <div style={{ height: '60%' }}>
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup component='div' >
                <CSSTransition
                  mountOnEnter={false}
                  unmountOnExit={true}
                  key={location.pathname.split("/")[1] || '/'}
                  classNames="page"
                  timeout={{
                    enter: 1000,
                    exit: 1000,
                  }}
                >
                  <Route
                    location={location}
                    render={() => (
                      <Switch location={location}>
                        <Route exact path="/" component={Login} />
                        <Route exact path='/register' component={Register} />
                      </Switch>
                    )}
                  />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </div>
    </div >
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired
}
export default withRouter(App);

