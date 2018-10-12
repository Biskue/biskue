import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';


export default class Landing extends Component {

  render() {
    return (
      
      <div className="landing">
        <div className='biskue-logo'>
          <h1>BIIIIIIIIIIISKUE</h1>
        </div>
        <div className='poll-buttons'>
          <div>
            <Link to='/wizard/step-1'>
              <button className='create-poll'>Start Poll</button>
            </Link>
            <Link to='/user-info'>
              <button className='create-poll'>Select poll from favorites</button>
            </Link>
            <button className='create-poll'>Join Poll</button>
          </div>
          
          <div>
          </div>
        </div>
      </div>
    );
  }
}