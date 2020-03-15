import React from 'react';
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

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      background: background
    }
  }

  static propTypes = {
    location: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const path = this.props.location.pathname.split('/')[1] || '/';
      if (path === '/' || path === 'register') {
        this.setState({ background: background })
      }
      else {
        this.setState({ background: null })
      }
    }
  }

  render() {
    return (
      <div className='app'>
        <img style={this.state.background && {
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          alt:'',
          backgroundSize: 'cover',
          filter: `blur(10px)`,
          backgroundImage: `url(${this.state.background})`
        }} />
        <div>
          <img src={logo} style={ {width: '40%',
          alt:'PortfolYo!',
          height: '40%', zIndex:1, position:'relative', left: '30%'}} />
          <main>
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
          </main>
        </div>
        <Switch>
          <Route path="/about" component={About} />
          <Route path='/home' component={withAuthentication(Dashboard)} />
          {/* <Route component={Error404} /> */}
        </Switch >
      </div >
    );
  }
}
export default withRouter(App);

