import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

class StepThree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			selected: []
		};
	}
	componentWillMount() {
		const { latitude, longitude, radius, categories, priceRange, date } = this.props;
		axios
			.get(
				`/poll/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&open_at=${date}&categories=${categories}&price=${priceRange}`
			)
			.then((results) => this.setState({ restaurants: results.data.businesses }));
	}
	addRestaurant = (restaurant) => {
		const selected = this.state.selected;
		selected.push(restaurant);
		this.setState({ selected });
	};

	render() {
		const restaurantsList = this.state.restaurants.map((restaurant, index) => {
			return <RestaurantCard key={index} addRestaurant={this.addRestaurant} currentRes={restaurant} />;
		});
		const doneButton =
			this.state.selected.length > 0 ? (
				<Link to="/wizard/step-4">
					<button onClick={()=> this.props.saveStepThree(this.state.selected)}>Done</button>
				</Link>
			) : null;
		return (
			<div>
				<h2>Select Restaurants to add to Poll</h2>
				{doneButton}
				{restaurantsList}
			</div>
		);
	}
}
export default connect((state) => state, Actions)(StepThree);
