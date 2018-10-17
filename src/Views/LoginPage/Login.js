import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import biskue_top from '../../../src/biskue_top.png';


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
                <div className='biskue-logo'>
                    <img src={biskue_top} alt="biskue logo" className='biskue-top'/>
                </div>
                <div className="poll-buttons">
                    <div className="input-container">
                        <label>Username:</label>
                        <input onChange={this.handleChange} name="username" value={this.state.username} type="text" />
                        <label>Password:</label>
                        <input onChange={this.handleChange} name="password" value={this.state.password} type="password" />
                    </div>

                    <button className="create-poll" onClick={this.confirmUserInfo}>Login</button>
                    <Link to='/register'>
                    <button className="create-poll" >Register</button>
                    </Link>

                </div>
            </div>
        );
    }
}

export default connect(state => state, Actions)(Login);