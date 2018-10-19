import React, { Component } from 'react';
import './Register.css';
import biskue_top from '../../../src/biskue_top.png';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = (e) => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      avatar: `https://robohash.org/${this.state.username}.png`,
    };
    axios
      .post('/auth/register', user)
      .then(result => {
        console.log(result);
        this.login();
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err);
      });
  };

  login = (e) => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('/auth/login', user)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

  render() {
    const passwordMatch =
      this.state.password !== '' &&
      this.state.password === this.state.confirmPassword ? (
        <button onClick={() => this.register()}>Submit</button>
      ) : null;
    return (
      <div>
        <div className="Register">
          <div className="biskue-logo">
            <img src={biskue_top} alt="biskue logo" className="biskue-top" />
          </div>
          <div className="poll-buttons">
            <div className="input-container">
              <input
                onChange={this.handleChange}
                name="username"
                type="text"
                value={this.state.username}
                placeholder="Username"
              />
             
              <input
                onChange={this.handleChange}
                name="firstName"
                value={this.state.firstName}
                type="text"
                placeholder="First Name"
              />
            
              <input
                onChange={this.handleChange}
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
              />
             
            </div>
            <div className="input-container-two">
                <input
                onChange={this.handleChange}
                name="email"
                type="text"
                value={this.state.email}
                placeholder="Email"
              />

              <input
                onChange={this.handleChange}
                name="lastName"
                value={this.state.lastName}
                type="text"
                placeholder="Last Name"
              />

             <input
                onChange={this.handleChange}
                name="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                placeholder="Confirm Password"
              />
            
            </div>
            {passwordMatch}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
