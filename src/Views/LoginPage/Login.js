import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

    }

    confirmUserInfo = (e) => {
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        axios.post('/auth/login', user)
          .then((response) => {
            this.props.history.push('./')
          })
          .catch(err => {
            console.log(err);
          })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (

            <div className="Login">
                <div className="title">BISKUE</div>
                <div className="poll-buttons">
                    <div className="input-container">
                        <label>Username:</label>
                        <input onChange={this.handleChange} name="username" value={this.state.username} type="text" />
                        <label>Password:</label>
                        <input onChange={this.handleChange} name="password" value={this.state.password} type="password" />
                    </div>

                    <button className="create-poll" onClick={this.confirmUserInfo}>Login</button>
                    <Link to='/register'>
                    <button className="create-poll " >Register</button>
                    </Link>

                </div>
            </div>
        );
    }
}

export default Login;