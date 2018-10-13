import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }

    }

    confirmUserInfo = (e) => {
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        axios.post('/auth/login', user)
            .then((response) => {
                const user = response.data;
                if (user.id) {
                    this.props.verifyAuth(!this.state.loggedIn);
                    this.props.history.push('./');
                }
                else console.log('No user found...')
                
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
                <div className="login-box">
                    <div className="input-container">
                        <label>Username:</label>
                        <input onChange={this.handleChange} name="username" value={this.state.username} type="text" />
                        <label>Password:</label>
                        <input onChange={this.handleChange} name="password" value={this.state.password} type="password" />
                    </div>

                    <button onClick={this.confirmUserInfo}>Login</button>

                </div>
            </div>
        );
    }
}

export default connect(state => state, Actions)(Login);