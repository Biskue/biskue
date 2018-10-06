import React, { Component } from 'react';
import './NavBar.css';
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <img className="Navbar-logo" src={logo} alt="logo" />

        <Link to='/user-info'>
        <span>Login</span>
        </Link>
        <Link to='/user-info'>
        <span>Register</span>
        </Link>
        
      </div>
    )
  }
}
