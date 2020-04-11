import '../bootstrap/css/style.css'
import '../bootstrap/fonts/material-icon/css/material-design-iconic-font.min.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (

        <div className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <img src={require('../resources/signInImage.jpg')} alt='Sign In'/>
                        <Link to={'/register'} className="signup-image-link">Create an account</Link>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-github"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
