import React, { Component } from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';


class Register2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.state.username,
            email: this.props.state.email,
            password: this.props.state.password,
            firstName: '',
            lastName: '',
            
        }
    }

    sendUserInfo = (e) => {
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatar: `https://robohash.org/${this.state.username}.png`
        }

        axios.post('/auth/register', user).then((response) => {
        })
            .catch(err => {
            console.log(err)
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (

            <div className="Register">
                <div className="title">BISKUE</div>
                <div className="poll-buttons">
                    <div className="input-container">
                        <label>First Name:</label>
                        <input onChange={this.handleChange} name="firstName" value={this.state.firstName} type="text"  />
                        <label>Last Name:</label>
                        <input onChange={this.handleChange} name="lastName" value={this.state.lastName} type="text" />
                    </div>
                
                    <button className='create-poll' onClick={this.sendUserInfo}>Register</button>
                
                </div>
            </div>
        );
    }
}

export default Register2;