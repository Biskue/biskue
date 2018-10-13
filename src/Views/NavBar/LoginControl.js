import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';





import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';



class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false,
        };
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
          button =
             <Link to='/Login'>
              <LoginButton onClick={this.handleLoginClick} />
            </Link>
          
      }
    
  
      return (
        <div className="login-logout-button">
          {button}
        </div>
      );
    }
  }
  

export default LoginControl;