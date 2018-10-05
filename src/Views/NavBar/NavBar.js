import React, { Component } from 'react';
import './NavBar.css';
import logo from '../../logo.svg'

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <img className="Navbar-logo" src={logo} alt="logo" />

        <span>Login</span>
        <span>Register</span>
        
      </div>
    )
  }
}
