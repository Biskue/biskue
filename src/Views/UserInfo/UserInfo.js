import React, { Component } from 'react';
import axios from 'axios';
import './UserInfo.css'

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
		};
	}
	componentWillMount() {
		const promises = [];
		promises.push(axios.get('lists/').then(({ data }) => data));
		promises.push(axios.get('/auth/login').then(({ data }) => data));
		return Promise.all(promises)
			.then(([ favorites, user ]) => {
				const { username, email, firstName, lastName, avatar } = user;
				this.setState({ favorites, username, email, firstName, lastName, avatar, loading: false });
			})
			// .catch(() => this.props.history.push('/login'));
  }
  handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
  }
  editUserInfo(){
    if(this.state.editInfo){
      return this.setState({editInfo: false})
    }
    this.setState({editInfo: true})
  }
	render() {
    const username = this.state.editInfo ? <input className='user-info' value={this.state.username} onChange={(e)=> this.handleChange(e,'username')}/> : this.state.username
    const email = this.state.editInfo ? <input className='user-info' value={this.state.email} onChange={(e)=> this.handleChange(e,'email')}/> : this.state.email
    const firstName = this.state.editInfo ? <input className='user-info' value={this.state.firstName} onChange={(e)=> this.handleChange(e,'firstName')}/> : this.state.firstName
    const lastName = this.state.editInfo ? <input className='user-info' value={this.state.lastName} onChange={(e)=> this.handleChange(e,'lastName')}/> : this.state.lastName
    const editOrCancel = this.state.editInfo ? "Cancel" : "Edit"
    const saveChanges = this.state.editInfo ? <button>Save Changes</button> : null
    const loading = this.state.loading ? (
			'Loading...'
		) : (
			<div >
        
				<h2 className='personal-info-header'>Personal Info</h2>
        
        <div className='personal-info'>
				<img className='profile-picture' src={this.state.avatar} alt="avatar" />
        <div>
				<div>  <b id='bold'>Username: </b>{username}</div>
				<div>  <b id='bold'>First name: </b>{firstName}</div>
				<div> <b id='bold'>Last name: </b>{lastName}</div>
				<div> <b id='bold'>email: </b>{email}</div>
        {saveChanges}
        <button onClick={()=> this.editUserInfo()}>{editOrCancel}</button>
        </div>
        </div>
			</div>
		);
  return (<div> 
    {loading}
  </div>);
	}
}
