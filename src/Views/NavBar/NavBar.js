import React, { Component } from 'react';
import './NavBar.css';
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        

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

