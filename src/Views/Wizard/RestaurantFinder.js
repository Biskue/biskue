import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';

class RestaurantFinder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			restaurants: []
		};
	}
	handleChange(string) {
		this.setState({ search: string });
	}
	searchForRestaurant() {
		axios
			.get(
				`/poll/search?latitude=${this.props.latitude}&longitude=${this.props.longitude}&term=${this.state
					.search}`
			)
			.then((results) => this.setState({ restaurants: results.data.businesses }));
	}
	render() {
		const searchResults =
			this.state.restaurants.length > 0
				? this.state.restaurants.map((restaurant, index) => {
						return (
							<RestaurantCard
								key={index}
								addRestaurant={this.props.addRestaurant}
								currentRes={restaurant}
							/>
						);
					})
				: null;
		return (
			<div>
				<input type="text" value={this.state.search} onChange={(e) => this.handleChange(e.target.value)} />
				<button onClick={() => this.searchForRestaurant()}>Search</button>
                {searchResults}
			</div>
		);
	}
}
export default connect((state) => state)(RestaurantFinder);
