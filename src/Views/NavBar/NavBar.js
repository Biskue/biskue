import React, { Component } from 'react';
import './NavBar.css';
import bisuke_icon from '../../../src/bisuke_icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('/auth/login').then(response => {
      this.setState({ loggedIn: true }) 
    }).catch(err => {
      console.log(err);
  })
  }
  

  logout =() => {
    axios.post('/auth/logout').then(() => {
      this.props.verifyAuth(this.state.false)
      this.setState({
        user: '',
      })
    })
    console.log(this.state.user)
  }

  login =() => {
    this.props.history.push('/login')
  }




   render() {
      console.log(this.props)
    return (
      <div className="navbar">
        <Link to='/'>
        <img className="navbar-logo" src={bisuke_icon} alt="logo" />
        </Link>
        {this.props.loggedIn ? (
           <button onClick={this.logout}>Logout</button>
        ) :
          (
            <button onClick={this.login}>Login</button>
          )
      } 
      </div>
    )
  }
 }
export default connect(state => state, Actions)(NavBar);