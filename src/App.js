import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Landing  from './Views/LandingPage/Landing';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">taylor's branch</h1>
        </header> */}
        <Landing />
      </div>
    );
  }
}

export default App;
