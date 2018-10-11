import React, { Component } from 'react';
import './NavBar.css';
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to='/'>
        <img className="navbar-logo" src={logo} alt="logo" />
        </Link>
        <Link to='/Login'>
        <span>Login</span>
        </Link>
        
      </div>
    )
  }
}

