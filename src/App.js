import React, { Component } from 'react';
import './App.css';
import 'reset-css';
import {Route} from 'react-router-dom';
import  NavBar from './Views/NavBar/NavBar';

import Routes from './Routes'

class App extends Component {
  render() {
    return (

      <div className="App">
       <Route component = {NavBar}/>
      <Routes />
      </div>
    );
  }
}

export default App;
