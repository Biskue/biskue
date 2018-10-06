import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Landing extends Component {

  render() {
    return (
      <div>
        <Link to='/wizard/step-1'>
          <button>Start Poll</button>
        </Link>
        <Link to='/user-info'>
          <button>Select poll from favorites</button>
        </Link>
        <button>Join Poll</button>
      </div>
    );
  }
}