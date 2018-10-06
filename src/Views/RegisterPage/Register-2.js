import React, { Component } from 'react';
import './Register.css';


class Register2 extends Component {
    render() {
        return (

            <div className="Register">
                <div className="title">BISKUE</div>
                <div className="register-box">
                    <div className="input-container">
                        <label>First Name:</label>
                        <input type="text" />
                        <label>Last Name:</label>
                        <input type="text" />
                    </div>
               
                    <button>Register</button>
              
                </div>
            </div>
        );
    }
}

export default Register2;