import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Views/LandingPage/Landing';
import LivePoll from './Views/LivePoll/LivePoll';
import UserInfo from './Views/UserInfo/UserInfo';
import Wizard from './Views/Wizard/Wizard';
import Register from './Views/RegisterPage/Register';
import Login from './Views/LoginPage/Login';
import Winner from './Views/LivePoll/Winner'

export default () => {
	return (
		<div>
			<Route path="/poll/:pollCode" component={LivePoll} />
			<Route path ="/winner/:pollCode" component={Winner} />
			<Route path="/user-info" component={UserInfo} />
			<Route path="/wizard" component={Wizard} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route exact path ="/" component={Landing} />
		</div>
	);
};
