import React, { Component } from 'react';
import './NavBar.css';
import biskue_icon_lined_wh from '../../../src/biskue_icon_lined_wh.png';
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
      this.props.verifyAuth(true)
      this.setState({ loggedIn: true }) 
    }).catch(err => {
      console.log(err);
  })
  }
  

  logout =() => {
    axios.post('/auth/logout').then(() => {
      this.props.verifyAuth(false)
      this.setState({
        user: '',
      })
    })
  }

  login =() => {
    this.props.history.push('/login')
  }




   render() {
    return (
      <div className="navbar">
        <Link to='/'>
        <img className="navbar-logo" src={biskue_icon_lined_wh} alt="logo" />
        </Link>
        <div className='buttons-container'>
        {this.props.loggedIn ? (
           <button onClick={this.logout}>Logout</button>
        ) :
          (
            <button onClick={this.login}>Login</button>
          )
      }
      {this.props.loggedIn? <Link to='/user-info'><button>Account Info</button> </Link> : null} 
      </div>
      </div>
    )
  }
 }
export default connect(state => state, Actions)(NavBar);