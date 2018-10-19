import React, { Component } from 'react';

export default class RestaurantCard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
        return(
            <div className='restaurant-vote-card'>
				<img className="restaurant-image" src={this.props.currentRes.image_url} alt="from yelp" />
                <h3>{this.props.currentRes.name}</h3>
                <div>Total up votes: {this.props.upVotes}</div>
                <div>Total down votes: {this.props.downVotes}</div>
            </div>
        )
    }
}