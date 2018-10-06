import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';
export default class Landing extends Component {

  render() {
    return (
      
      <div>
        <div className='biskue-logo'>
          <h1>BIIIIIIIIIIISKUE</h1>
        </div>
        <div className='poll-buttons'>
          <div className='create-poll'>
            <Link to='/wizard/step-1'>
              <button>Start Poll</button>
            </Link>
  
            <Link to='/user-info'>
              <button>Select poll from favorites</button>
            </Link>
          </div>
          
          <div className='join-poll'>
            <button>Join Poll</button>
          </div>
        </div>
      </div>
    );
  }
}