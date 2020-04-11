import '../bootstrap/css/style.css'
import '../bootstrap/fonts/material-icon/css/material-design-iconic-font.min.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../services/RegisterService'
import { useHistory } from 'react-router-dom';

const Register = (props) => { // functional componnet

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const routeTo = useHistory().push

    const onSubmit = async () => {
        const validEmail = validateEmail()
        const validPass = validatePass()
        if (validEmail && validPass) {
            const status = await register({ firstName, lastName, email, password })
            switch (status) {
                case 409: // already exists - conflict status
                // alert the user for 'email already exists'
                case 200:
                // save email and password in local storage
                
                // reroute to login
                routeTo('/')
                default:
                // 404... etc whatever handle it
            }
        }
        else {
            if (!validEmail) {
                // alert 
            }
            if (!validPass) {
                /// alert with label that changes according to state change
            }
        }

        // call a method to contact the server and if the response is valid - save localy the data , redirect to home
    }

    const validateEmail = () => {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(email)
        return validEmail
    }

    const validatePass = () => passwordValidation === password

    return (
        <div className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Register</h2>
                        <div className="form-group">
                            <label ><i className="zmdi zmdi-account material-icons-name"></i></label>
                            <input onChange={e => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label ><i className="zmdi zmdi-account material-icons-name"></i></label>
                            <input onChange={e => setLastName(e.target.value)} type="text" name="lastName" id="lastName" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <label ><i className="zmdi zmdi-email"></i></label>
                            <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label ><i className="zmdi zmdi-lock"></i></label>
                            <input onChange={e => setPassword(e.target.value)} type="password" name="pass" id="pass" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label ><i className="zmdi zmdi-lock-outline"></i></label>
                            <input onChange={e => setPasswordValidation(e.target.value)} type="password" name="re_pass" id="re_pass" placeholder="Validate Password" />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                            <label className="label-agree-term">I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                        </div>
                        <div className="form-group form-button">
                            <input onClick={onSubmit} type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                        </div>
                    </div>
                    <div className="signup-image">
                        <img src={require('../resources/registerImage.jpg')} alt="Register" />
                        <Link to={'/'} className="signup-image-link">I am already member</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register