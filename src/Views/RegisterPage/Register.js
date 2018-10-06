import React, { Component } from 'react';
import './Register.css';

import Register2 from './Register-2';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false,
            username: '',
            email: '',
            password: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    

    
    changeView = () => { 
        this.setState({
            view: !this.state.view
        })
    }




    render() {
        return (
            <div>
                {this.state.view ? <Register2 state={this.state}/> :
                    <div className="Register" >
                        <div className="title">BISKUE</div>
                        <div className="register-box">
                            <div className="input-container">
                                <label>Username:</label>
                                <input onChange={this.handleChange} name="username" type="text" value={this.state.username} />
                                <label>Email:</label>
                                <input onChange={this.handleChange} name="email" type="text" value={this.state.email} />
                                <label>Password:</label>
                                <input onChange={this.handleChange} name="password" type="text" value={this.state.password} />
                            </div>
                                <button onClick={this.changeView}> Next</button>
                        </div>
                    </div >
                }
            </div>
        );
    }
}

export default Register;