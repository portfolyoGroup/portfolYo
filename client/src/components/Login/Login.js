import { MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import React, { Component } from 'react';
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

class Login extends Component {
  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/home');
      }
    });
  }

  render() {
    return (
      <AnimatedPage>
        <MDBContainer>
          <MDBRow style={{ justifyContent: 'flex-start' }}>
            <MDBCol md="6" style={{ borderRadius: 20, boxShadow: "-2px -2px 12px #9E9E9E" }}>
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
          </MDBRow>

          <MDBRow style={{ marginTop: "15%" }}>
            <MDBCol md="6">
              <MDBCardBody className="mx-4">
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </AnimatedPage>
    );
  }
}

export default Login;