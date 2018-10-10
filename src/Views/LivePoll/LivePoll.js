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
	console.log(response)
	 const restaurants= response.data.map(rest => rest.pollOption)
	this.setState({restaurants: restaurants})
})
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

			socket.on('incremented', (number) => {
				this.setState({
					number
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

	render() {
    const modalButton = this.state.username != '' ? <button onClick={()=> this.saveUsername()}>Go</button> : null
	const restaurantsList = this.state.restaurants.map((rest, index)=> {
		return(
			<RestaurantCard key= {index} currentRes= {rest} />
		)
	})
	return (
			<div>
				Hello
				{this.state.response.hello}
				<button onClick={() => this.increment()}>Increment Socket</button>
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
    this.setState({modalIsOpen: false})
  }
}
