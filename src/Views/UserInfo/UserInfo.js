import React, { Component } from 'react';
import axios from 'axios';
import './UserInfo.css';
import EditFavorites from './EditFavorites';


export default class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			avatar: '',
			loading: true,
			editInfo: false,
			id: null,
			updatePassword: false,
			password: '',
			passwordConfirm: '',
			oldPassword: ''
		};
	}
	componentWillMount() {
		const promises = [];
		promises.push(axios.get('lists/').then(({ data }) => data));
		promises.push(axios.get('/auth/login').then(({ data }) => data));
		return Promise.all(promises).then(([ favorites, user ]) => {
			const { username, email, firstName, lastName, avatar, id } = user;
			this.setState({ favorites, username, email, firstName, lastName, avatar, id, loading: false });
		})
		.catch(() => this.props.history.push('/login'));
	}
	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	editUserInfo() {
		if (this.state.editInfo) {
			return this.setState({ editInfo: false });
		}
		this.setState({ editInfo: true });
	}
	deleteList(index, id) {
		const favorites = this.state.favorites;
		favorites.splice(index, 1);
		axios.delete('/lists/delete/' + id).then(() => {
			this.setState({ favorites });
		});
	}
	saveChanges(id) {
		const user = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			avatar: this.state.avatar
		};
		axios.put(`/auth/edit/${id}?type=profileEdit`, user).then((response) => {
			const { username, firstName, lastName, email, avatar } = response.data;
			this.setState({ username, firstName, lastName, email, avatar, editInfo: false });
		});
	}
	showHidePassword() {
		if (this.state.updatePassword) {
			return this.setState({ updatePassword: false });
		}
		this.setState({ updatePassword: true });
  }
  updatePassword(){
    const passwords={oldPassword: this.state.oldPassword, newPassword: this.state.password}
    axios.put(`/auth/edit/${this.state.id}?type=newPassword`, passwords).then(()=> this.setState({updatePassword: false}))
  }
	render() {
		const username = this.state.editInfo ? (
			<input
				className="user-info"
				value={this.state.username}
				onChange={(e) => this.handleChange(e, 'username')}
			/>
		) : (
			this.state.username
		);
		const email = this.state.editInfo ? (
			<input className="user-info" value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} />
		) : (
			this.state.email
		);
		const firstName = this.state.editInfo ? (
			<input
				className="user-info"
				value={this.state.firstName}
				onChange={(e) => this.handleChange(e, 'firstName')}
			/>
		) : (
			this.state.firstName
		);
		const lastName = this.state.editInfo ? (
			<input
				className="user-info"
				value={this.state.lastName}
				onChange={(e) => this.handleChange(e, 'lastName')}
			/>
		) : (
			this.state.lastName
		);
		const editOrCancel = this.state.editInfo ? 'Cancel' : 'Edit';
		const saveChanges = this.state.editInfo ? (
			<button onClick={() => this.saveChanges(this.state.id)}>Save Changes</button>
		) : null;
		const favoritesList = this.state.favorites.map((fav, index) => {
			return (
				<div key={index}>
					<EditFavorites history ={this.props.history}/><button className='delete-button' onClick={() => this.deleteList(index, fav.id)}>delete</button>
				</div>
			);
		});
		const loading = this.state.loading ? (
			'Loading...'
		) : (
			<div className="personal-info-container">
				<h2 className="personal-info-header">Personal Info</h2>

				<div className="personal-info">
					<img className="profile-picture" src={this.state.avatar} alt="avatar" />
					<div>
						<div>
							<b id="bold">Username: </b>
							{username}
						</div>
						<div>
							<b id="bold">First name: </b>
							{firstName}
						</div>
						<div>
							<b id="bold">Last name: </b>
							{lastName}
						</div>
						<div>
							<b id="bold">email: </b>
							{email}
						</div>
						{saveChanges}
						<button onClick={() => this.editUserInfo()}>{editOrCancel}</button>
					</div>
				</div>
			</div>
		);
		const savePassword =
			this.state.password !== '' && this.state.password === this.state.passwordConfirm ? (
				<button onClick={() => this.updatePassword()}>Submit Changes</button>
			) : null;
		const changePassword = this.state.updatePassword ? (
			<div>
				<input
					placeholder="Current Password"
					value={this.state.oldPassword}
          type="password"
          className='user-info'
					onChange={(e) => this.handleChange(e, 'oldPassword')}
				/>{' '}
				<input
					placeholder="New Password"
					value={this.state.password}
          type="password"
          className='user-info'
					onChange={(e) => this.handleChange(e, 'password')}
				/>{' '}
				<input
					placeholder="Confirm New Password"
					value={this.state.passwordConfirm}
          type="password"
          className='user-info'
					onChange={(e) => this.handleChange(e, 'passwordConfirm')}
				/>{' '}
				<div>{savePassword}</div><button onClick={() => this.showHidePassword()}>cancel</button> 
			</div>
		) : (
			<button onClick={() => this.showHidePassword()}>Change Password</button>
		);
		return (
			<div className="user-info-container">
				{loading}
				<div className="favs-container">
					<h2 className="personal-info-header">Favorites Lists</h2>
					{favoritesList}
				</div>
        <div>
          {changePassword}
        </div>
			</div>
		);
	}
}
