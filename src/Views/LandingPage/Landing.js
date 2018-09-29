import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar';
import './Landing.css';
import logo from '../../logo.svg';

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <NavBar />
        <div className="About-us">
          <h1>Biskue</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Risus feugiat in ante metus dictum at. Gravida in fermentum et sollicitudin. Ornare suspendisse sed nisi lacus sed viverra.
              </p>
        </div>

        <div className="Cards">
        <div class="card">
            <img src={logo} alt="Avatar" />
            <div className="container">
              <h4><b>John Doe</b></h4> 
              <p>Architect & Engineer</p> 
            </div>
          </div>

         <div class="card">
            <img src={logo} alt="Avatar" />
            <div className="container">
              <h4><b>John Doe</b></h4> 
              <p>Architect & Engineer</p> 
            </div>
          </div>

           <div class="card">
            <img src={logo} alt="Avatar" />
            <div className="container">
              <h4><b>John Doe</b></h4> 
              <p>Architect & Engineer</p> 
            </div>
          </div>
          
        </div>
          
        <div className="Create-join-buttons">
          <button className="Create-Poll">Create Poll</button>
          <button className="Create-Poll">Join Poll</button>
          
        </div>

          </div>
          
    );
  }
}


