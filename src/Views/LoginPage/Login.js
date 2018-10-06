import React, { Component } from 'react';
import './Login.css';


class Login extends Component {
    render() {
        return (

            <div className="Login">
                <div className="title">BISKUE</div>
                <div className="login-box">
                    <div className="input-container">
                        <label>Email or Username:</label>
                        <input type="text" />
                        <label>Password:</label>
                        <input type="password" />
                    </div>

                    <button>Login</button>

                </div>
            </div>
        );
    }
}

export default Login;