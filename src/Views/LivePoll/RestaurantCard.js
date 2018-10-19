import React, { Component } from 'react';
import upVote from '../../upVote.png';
import downVote from '../../downVote.png';
import './RestaurantCard.css';

export default class RestaurantCard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const categories = this.props.currentRes.categories.map((cat) => cat.title);
		const categoriesJoined = categories.join(', ');
		return (
			<div className='restaurant-vote-card'>
				<img className="restaurant-image" src={this.props.currentRes.image_url} alt="from yelp" />
				<div>
					<div className='restaurant-info'>	
						<a href={this.props.currentRes.url}><h3>{this.props.currentRes.name}</h3></a>
						<p>{categoriesJoined}</p>
						<p>Price: {this.props.currentRes.price}</p>
						<p>
							{this.props.currentRes.display_phone} <br />
							{this.props.currentRes.location.address1 +
								' ' +
								this.props.currentRes.location.address2 +
								' ' +
								this.props.currentRes.location.address3}{' '}
							<br />
							{this.props.currentRes.location.city +
								', ' +
								this.props.currentRes.location.state +
								' ' +
								this.props.currentRes.location.zip_code}
						</p>
					</div>
					<div className='big-vote-container'>
						<div className='vote-image-container'>
							<img 
								className='vote-image'
								src={upVote}
								alt="up vote"
								onClick={() => this.props.vote(true, this.props.optionId, this.props.currentIndex)}
							/>
							{this.props.currentVotes.upVotes}
						</div>
						{this.props.downVote ? 	
							<div className='vote-image-container'>
								<img
									className='vote-image'
									src={downVote}
									alt="down vote"
									onClick={() => this.props.vote(false, this.props.optionId, this.props.currentIndex)}
								/>
								{this.props.currentVotes.downVotes}
							</div>
						: null}
					</div>
				</div>
			</div>
		);
	}
}
