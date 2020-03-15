import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './SocialButtonList.css';
import '../Login/Login.css'
import { SocialIcon } from 'react-social-icons';


const propTypes = {
  buttonList: PropTypes.shape({
    github: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
    google: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
    facebook: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    })
  }).isRequired,
  auth: PropTypes.func.isRequired,
  currentProviders: PropTypes.func
};

const defaultProps = {
  currentProviders: null
};

const SocialButtonList = ({ history, buttonList, auth, currentProviders }) => {

  const authHandler = authData => {
    if (authData) {
      if (currentProviders === null) {
        history.push('/dashboard');
      } else {
        currentProviders(authData.user.providerData);
      }
    } else {
      console.error('Error authenticating');
    }
  };

  const authenticate = (e, provider) => {
    const providerOAuth = buttonList[provider].provider();

    if (auth().currentUser === null) {
      auth()
        .signInWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => console.error(err));
    } else {
      auth()
        .currentUser.linkWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => console.error(err));
    }
  };

  const renderButtonList = provider => {
    const visible = buttonList[provider].visible;

    return (
      <div className={`mr-md-3 z-depth-1a3 ${!visible && 'hidden'}`} key={provider}>
        <SocialIcon network={provider}
          onClick={e => authenticate(e, provider)} />
      </div>
    );
  }
  return (
    <div className="row my-3 d-flex justify-content-center">
      {Object.keys(buttonList).map(renderButtonList)}
    </div>
  );
};

SocialButtonList.propTypes = propTypes;
SocialButtonList.defaultProps = defaultProps;

export default withRouter(SocialButtonList);