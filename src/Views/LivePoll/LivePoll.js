import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import RestaurantCard from './RestaurantCard';
import TiedRestaurantCard from './TiedRestaurantCard';
import Chat from './Chat';
import './LivePoll.css'
import CurrentUsers from './CurrentUsers';

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
			adminId: null,
			isActive: true,
			number: 0,
			pollCode: this.props.match.params.pollCode,
			modalIsOpen: false,
			username: '',
			restaurants: [],
			outOfVotes: false,
			userId: null,
			tiebreaker: false,
			tieOptions: [],
			allowChat: false,
			allowDownVote: false,
			loggedIn: false,
		};
	}
	componentWillMount() {
		axios.get(`/poll/retrieve/${this.props.match.params.pollCode}`).then((response) => {
			const restaurants = response.data.map((rest) => {
				return {
					pollItem: rest.pollOption,
					upVotes: rest.upVotes,
					downVotes: rest.downVotes,
					optionId: rest.optionId,
					pollId: rest.pollId
				};
			});

			this.setState({ 
				restaurants, 
				adminId: response.data[0].adminUserId, 
				isActive: response.data[0].isActive, 
				allowChat: response.data[0].allowChat,
				allowDownVote: response.data[0].allowDownVotes, 
			});
			if (response.data[0].isActive === false) {
				this.props.history.push(`/winner/${this.state.pollCode}`);
			}
		});
		axios
			.get('/auth/login')
			.then((res) => {
				if (res.data.id) {
					this.setState({ userId: res.data.id,  loggedIn: true});
				}
			})
			.catch((err) => {
				console.log(err);
				this.setState({ modalIsOpen: true });
			});
	}

	componentDidMount() {
		var room = this.state.pollCode;

		socket.emit('room', room);
		
		socket.on('incremented', (number, index) => {
			const restaurants = this.state.restaurants;
			restaurants[index].upVotes = number;
			this.setState({
				restaurants
			});
		});

		socket.on('decremented', (number, index) => {
			const restaurants = this.state.restaurants;
			restaurants[index].downVotes = number;
			this.setState({
				restaurants
			});
		});

		socket.on('joined', (user) => {
			console.log(user);
		});

		socket.on('closePoll', () => {
			if(this.state.userId){
			this.props.history.push(`/winner/${this.state.pollCode}`);
			}
			else{
				axios.post('/auth/logout').then(()=>{
					this.props.history.push(`/winner/${this.state.pollCode}`)
				})
			}
		});
	}

	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	
	vote = (upOrDown, optionId, index) => {
		axios
			.put(`/poll/vote/${this.state.restaurants[0].pollId}`)
			.then((response) => {
				console.log(response);
				socket.emit('vote', upOrDown, optionId, this.state.pollCode, index);
			})
			.catch(() => this.setState({ outOfVotes: true }));
	};
	logout() {
		axios.post('/auth/logout').then(() => console.log('logged out'));
	}
	closeOutOfVotes() {
		this.setState({ outOfVotes: false });
	}
	closePoll() {
		axios.get(`/poll/winners/${this.state.restaurants[0].pollId}`).then((response) => {
			if (response.data.length === 1) {
				const winner = response.data[0].pollOption;
				axios.put(`/poll/setWinner/${this.state.restaurants[0].pollId}`, { winner }).then(() => {
					socket.emit('end', this.state.pollCode);
				});
			} else {
				const tieOptions = response.data.map(rest => {rest.tiebreaker = Math.random()
				return rest}
		)
				this.setState({ tiebreaker: true, tieOptions });
			}
		});
	}
	breakTie(winner) {
		axios.put(`/poll/setWinner/${this.state.restaurants[0].pollId}`, { winner }).then(() => {
			this.setState({ tiebreaker: false });
			socket.emit('end', this.state.pollCode);
		});
	}
	randomTiebreaker(){
	const sorted = this.state.tieOptions.sort((a,b)=> b.tiebreaker - a.tiebreaker)
	const winner = sorted[0].pollOption
	axios.put(`/poll/setWinner/${this.state.restaurants[0].pollId}`, { winner }).then(() => {
		this.setState({ tiebreaker: false });
		socket.emit('end', this.state.pollCode);
	});

	}
	render() {
		const modalButton = this.state.username !== '' ? <button onClick={() => this.saveUsername()}>Go</button> : null;
		const restaurantsList = this.state.restaurants.map((rest, index) => {
			return (
				<RestaurantCard
					key={index}
					currentIndex={index}
					optionId={rest.optionId}
					currentRes={rest.pollItem}
					vote={this.vote}
					downVote={this.state.allowDownVote}
					currentVotes={{ upVotes: rest.upVotes, downVotes: rest.downVotes }}
				/>
			);
		});
		const tiebreakerOptions = this.state.tieOptions.map((rest, index) => {
			return (
				<div key={index} onClick={() => this.breakTie(rest.pollOption)}>
					<TiedRestaurantCard
						currentIndex={index}
						currentRes={rest.pollOption}
						upVotes={rest.upVotes} 
						downVotes= {rest.downVotes}
					/>
				</div>
			);
		});
		const closePollButton =
			this.state.adminId === this.state.userId && this.state.isActive ? (
				<div className='close-button-div'><button onClick={() => this.closePoll()}>End Poll</button></div>
			) : null;
		return (
			<div>
				
				{closePollButton}
				<div className='live-poll'>
					<div className='chat-section'>
						<div className='current-users'>
							<CurrentUsers pollCode={this.state.pollCode} socket={socket} />
						</div>
						{this.state.allowChat ? <Chat pollCode={this.state.pollCode} socket={socket} pollId={this.state.restaurants[0].pollId}/> : null}
					</div>
					<div className='poll-list'>
						{restaurantsList}
					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<h3>Type A Username your friends can identify you by</h3>
					<input type="text" value={this.state.username} onChange={(e) => this.handleChange(e, 'username')} />
					{modalButton}
				</Modal>
				<Modal
					isOpen={this.state.outOfVotes}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<h3>You are out of votes!</h3>
					<button onClick={() => this.closeOutOfVotes()}>OK</button>
				</Modal>
				<Modal
					isOpen={this.state.tiebreaker}
					contentLabel="Import Modal"
					style={customStyles}
				>
					<h3>Looks Like a Tie..</h3>
					<div style={{ display: 'flex' }}>{tiebreakerOptions}</div>
					<button onClick={() => this.randomTiebreaker()}>Pick For me</button>
				</Modal>
			</div>
		);
	}
	saveUsername() {
		axios.post(`/poll/join/${this.state.restaurants[0].pollId}`, { username: this.state.username }).then(() => {
			socket.emit('newUser', this.state.username, this.state.pollCode);
			this.setState({ modalIsOpen: false });
		});
	}
}
