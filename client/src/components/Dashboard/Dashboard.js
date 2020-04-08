import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SocialButtonList from '../SocialButtonList/SocialButtonList';
import SocialProfileList from '../SocialProfileList/SocialProfileList';
import { auth } from '../../firebase';
import './Dashboard.css';


const Dashboard = props => {
  const githubButton = {
    visible: true,
    provider: () => {
      const provider = auth.githubOAuth();
      provider.addScope('user');
      return provider;
    }
  }
  const facebookButton = {
    visible: true,
    provider: () => auth.facebookOAuth()
  }
  const googleButton = {
    visible: true,
    provider: () => auth.googleOAuth()
  }

  const [providerData, setProviderData] = useState(props.providerData)
  const [signInButtons, setSignInButtons] = useState({ github: githubButton, google: googleButton, facebook: facebookButton })

  useEffect(() => {
    updateProviders(providerData);
  }, [])

  const handleCurrentProviders = providerData => {
    updateProviders(providerData);
  };

  const handleUnliknedProvider = (providerName, providerData) => {
    if (providerData.length < 1) {
      auth
        .getAuth()
        .currentUser.delete()
        .then(() => console.log('User Deleted'))
        .catch(() => console.error('Error deleting user'));
    }

    let buttonList = { ...signInButtons };
    buttonList = updateButtonList(buttonList, providerName, true);
    setSignInButtons(buttonList)
    setProviderData(providerData)
  };

  const updateButtonList = (buttonList, providerName, visible) => ({
    ...buttonList,
    [providerName]: {
      ...buttonList[providerName],
      visible
    }
  });

  const updateProviders = providerData => {
    let buttonList = { ...signInButtons };

    providerData.forEach(provider => {
      const providerName = provider.providerId.split('.')[0];
      buttonList = updateButtonList(buttonList, providerName, false);
    });
    setSignInButtons(buttonList)
    setProviderData(providerData)
  };

  return (
    <div>
      <SocialProfileList
        auth={auth.getAuth}
        providerData={providerData}
        unlinkedProvider={handleUnliknedProvider}
      />
      <p style={{ textAlign: 'center' }}>
        <strong>Connect Other Social Accounts</strong>
      </p>
      <SocialButtonList
        buttonList={signInButtons}
        auth={auth.getAuth}
        currentProviders={handleCurrentProviders}
      />
      <button
        className="btn__logout"
        onClick={() => auth.getAuth().signOut()}
      >
        Logout
      </button>
    </div>
  );

}
Dashboard.propTypes = {
  providerData: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default Dashboard;