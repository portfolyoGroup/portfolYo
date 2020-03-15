import React from "react";
import { MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCloseIcon, Link } from 'mdbreact';
import AnimatedPage from '../../animations/AnimatedPage';
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const FormPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');

    const register = () => {
        alert(email);
    }

    return (
        <AnimatedPage>
            <MDBContainer className='page'>
                <MDBRow style={{ justifyContent: 'flex-end' }}>
                    <MDBCol md="6" style={{ borderRadius: 20, boxShadow: "-2px -2px 12px #9E9E9E" }}>
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="black-text mb-5">
                                    <Link to='/'>
                                        <MDBCloseIcon />
                                    </Link>
                                    <strong>Register</strong>
                                </h3>
                            </div>
                            <form>
                                <div className="white-text">
                                    <MDBInput className="md-form"
                                        label="First Name"
                                        group
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={setFirstName}
                                    />
                                    <MDBInput className="md-form"
                                        label="Last Name"
                                        group
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={setLastName}
                                    />
                                    <MDBInput className="md-form"
                                        label='Email'
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={setEmail}
                                    />
                                    <MDBInput className="md-form"
                                        label='Password'
                                        group
                                        type="password"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={setPassword}
                                    />
                                    <MDBInput className="md-form"
                                        label='Validate Password'
                                        group
                                        type="password"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={setPasswordValidation}
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn
                                        type="button"
                                        gradient="peach"
                                        rounded
                                        className="btn-block z-depth-1a"
                                        onClick={register}
                                    >
                                        Submit
                                </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </AnimatedPage>
    );
};

export default FormPage;