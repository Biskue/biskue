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
			number: 0,
      		pollCode: this.props.match.params.pollCode,
      		modalIsOpen: false,
      		username: '',
      		restaurants: []
		};
	}
componentWillMount(){
axios.get(`/poll/retrieve/${this.props.match.params.pollCode}`).then(response => {
	
	 const restaurants= response.data.map(rest => { return {pollItem: rest.pollOption, upVotes: rest.upVotes, downVotes: rest.downVotes, optionId: rest.optionId}})
	 
	this.setState({restaurants})
})
axios.get('/auth/login').then((res)=>{console.log(res)})
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
		console.log(upOrDown, optionId, index)
		socket.emit('vote', upOrDown, optionId, this.state.pollCode, index)
	}
	logout(){
		axios.post('/auth/logout').then(()=> console.log('logged out'))
	}
	render() {
    const modalButton = this.state.username != '' ? <button onClick={()=> this.saveUsername()}>Go</button> : null
	const restaurantsList = this.state.restaurants.map((rest, index)=> {
		return(
			<RestaurantCard key= {index} currentIndex= {index} optionId ={rest.optionId} currentRes= {rest.pollItem} vote={this.vote} currentVotes= {{upVotes: rest.upVotes, downVotes: rest.downVotes}}/>
		)
	})
	
	return (
			<div>
				Hello
				{this.state.response.hello}
				<button onClick={() => this.logout()}>Increment Socket</button>
				{this.state.number}
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
			</div>
		);
  }
  saveUsername(){
	  socket.emit('newUser')
    this.setState({modalIsOpen: false})
  }
}
