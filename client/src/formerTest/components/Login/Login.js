import { MDBRow, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import React, { useEffect } from 'react';
import SocialButtonList from '../SocialButtonList/SocialButtonList';
import { auth } from '../../firebase'
import './Login.css'
import { Link } from 'react-router-dom';
import AnimatedPage from '../../animations/AnimatedPage'

const buttonList = {
  github: {
    visible: true,
    provider: () => {
      const provider = auth.githubOAuth();
      provider.addScope('user');
      return provider;
    }
  },
  google: {
    visible: true,
    provider: () => auth.googleOAuth()
  },
  facebook: {
    visible: true,
    provider: () => auth.facebookOAuth()
  }
};

const Login = ({ history }) => {

  useEffect(() => {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        history.push('/home');
      }
    });
  }, [])

  return (
    <AnimatedPage>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '35%', marginLeft:'15%' }}>
          <div style={{ width: '100%' }}>
            <MDBCol style={{ borderRadius: 20, boxShadow: "-2px -2px 12px black", backgroundColor: 'rgba(255,255,255,0.6)' }}>
              <MDBCardBody className="mx-4" >
                <div className="text-center">
                  <h3 className="black-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <MDBInput className="md-form"
                  label="Email"
                  group
                  type="email"
                  color='black'
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput className="md-form"
                  label="Password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                />
                <p className="font-small orange-text d-flex justify-content-end pb-3">
                  Forgot
                <a href="#!" className="orange-text ml-1">
                    Password?
                </a>
                </p>
                <div className="text-center mb-3">
                  <MDBBtn
                    type="button"
                    gradient="peach"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Sign in
                </MDBBtn>
                </div>
                <p className="font-small black-text text-right d-flex justify-content-center mb-3 pt-2">
                  or Sign in with:
              </p>
                <SocialButtonList buttonList={buttonList} auth={auth.getAuth} />
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small black-text d-flex justify-content-end">
                  Not a member?
                <Link className="orange-text ml-1" to={{ pathname: '/register', state: { prev: true } }} >
                    Register
              </Link>
                </p>
              </MDBModalFooter>
            </MDBCol>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
export default Login;