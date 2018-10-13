import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import RestaurantCard from './RestaurantCard'
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4005/', {
	extraHeaders: { 'Access-Control-Allow-Credentials': 'omit' }
});

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

export default class LivePoll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			adminId: null,
			isActive: true,
			number: 0,
      		pollCode: this.props.match.params.pollCode,
      		modalIsOpen: false,
      		username: '',
			restaurants: [],
			outOfVotes: false,
			userId: null,
			  
		};
	}
componentWillMount(){
axios.get(`/poll/retrieve/${this.props.match.params.pollCode}`).then(response => {
	console.log(response)
	 const restaurants= response.data.map(rest => { return {pollItem: rest.pollOption, upVotes: rest.upVotes, downVotes: rest.downVotes, optionId: rest.optionId, pollId: rest.pollId}})
	 
	this.setState({restaurants, adminId: response.data[0].adminUserId, isActive: response.data[0].isActive})
if(response.data[0].isActive === false){
	this.props.history.push(`/poll/winner/${this.state.pollCode}`)
}
})
axios.get('/auth/login').then((res)=>{if(res.data.id){this.setState({userId: res.data.id})}})
.catch((err)=>  {console.log(err); this.setState({modalIsOpen: true})})
}

	componentDidMount() {
		var room = this.state.pollCode;
		socket.emit('room', room);
		socket.on('news', (data) => {
			this.setState({
				response: data
			});
			console.log(data);
			socket.send('hi');
		})
			socket.on('incremented', (number, index) => {
				console.log(number, index)
				const restaurants = this.state.restaurants
				restaurants[index].upVotes = number
				this.setState({
					restaurants
				});
			});
			socket.on('decremented', (number, index) => {
				const restaurants = this.state.restaurants
				restaurants[index].downVotes = number
				this.setState({
					restaurants
				});
			});
			socket.on('joined', (user)=>{console.log(user)})
			socket.on('closePoll', ()=>{
				this.props.history.push(`/poll/winner/${this.state.pollCode}`)
		});
	}

  handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	increment() {
		socket.emit('increment', this.state.number, this.state.pollCode);
	}
	vote = (upOrDown, optionId, index) => {
		axios.put(`/poll/vote/${this.state.restaurants[0].pollId}`).then((response)=>{
			console.log(response)
		socket.emit('vote', upOrDown, optionId, this.state.pollCode, index)
	})
	.catch(()=> this.setState({outOfVotes: true }))
	}
	logout(){
		axios.post('/auth/logout').then(()=> console.log('logged out'))
	}
	closeOutOfVotes(){
		this.setState({outOfVotes: false})
	}
	closePoll(){
		axios.post().then(()=>{
			socket.emit('end', this.state.pollCode)
		})
	}
	render() {
    const modalButton = this.state.username != '' ? <button onClick={()=> this.saveUsername()}>Go</button> : null
	const restaurantsList = this.state.restaurants.map((rest, index)=> {
		return(
			<RestaurantCard key= {index} currentIndex= {index} optionId ={rest.optionId} currentRes= {rest.pollItem} vote={this.vote} currentVotes= {{upVotes: rest.upVotes, downVotes: rest.downVotes}}/>
		)
	})
	const closePollButton = this.state.adminId === this.state.userId && this.state.isActive? <button>End Poll</button> : null
	return (
			<div>
				Hello
				{this.state.response.hello}
				<button onClick={() => this.logout()}>Increment Socket</button>
				{closePollButton}
				{restaurantsList}

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={()=>this.saveUsername()}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<h3>Type A Username your friends can identify you by</h3>
          <input type="text" value={this.state.username} onChange= {(e)=> this.handleChange(e, 'username')}/>
					{modalButton}
				</Modal>
				<Modal
					isOpen={this.state.outOfVotes}
					onRequestClose={()=>this.saveUsername()}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<h3>You are out of votes!</h3>
					<button onClick={()=>this.closeOutOfVotes()}>OK</button>
				</Modal>
			</div>
		);
  }
  saveUsername(){
	  socket.emit('newUser', this.state.username, this.state.pollCode)
	  console.log(this.state.restaurants[0].pollId)
	  axios.post(`/poll/join/${this.state.restaurants[0].pollId}`, {username: this.state.username}).then(()=>{
	this.setState({modalIsOpen: false})
})
  }
}
