import React, { Component } from 'react';
import './App.css';
import 'reset-css';
import NavBar from './Views/NavBar/NavBar';

import Routes from './Routes'

class App extends Component {
  render() {
    return (

      <div className="App">
        <NavBar/>
      <Routes />
      </div>
    );
  }
}

export default App;
