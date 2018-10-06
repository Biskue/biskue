import React, { Component } from 'react';
import './Register.css';

import { Link } from 'react-router-dom';


class Register extends Component {
    render() {
        return (

            <div className="Register">
                <div className="title">BISKUE</div>
                <div className="register-box">
                    <div className="input-container">
                        <label>Username:</label>
                        <input type="text" />
                        <label>Email:</label>
                        <input type="text" />
                        <label>Password:</label>
                        <input type="password" />
                    </div>
               <Link to="/register-2" >
                    <button>Next</button>
               </Link>
                </div>
            </div>
        );
    }
}

export default Register;