import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Actions from '../../Redux/Actions/actions';

class StepFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: this.props.PollItems,
			favorites: false,
			listName: ''
		};
	}
	deleteRestaurant = (index) => {
		const restaurants = this.state.restaurants;
    restaurants.splice(index, 1);
    this.props.saveStepThree(restaurants)
		this.setState({ restaurants });
	};
	saveList() {
		if (this.state.favorites === true) {
			return this.state({ favorites: false });
    }
		this.setState({ favorites: true });
	}
	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	ConfirmSettings() {
		const { longitude, latitude } = this.props;
		const favoritesSettings = {
			latitude,
			longitude,
			listItems: this.state.restaurants,
			listName: this.state.listName
    };
    if(this.state.favorites === true){
		axios.post('/lists/create', favoritesSettings).then(() => this.props.history.push('/wizard/step-5'));
    }else {this.props.history.push('/wizard/step-5')}
  }
	render() {
		const { longitude, latitude, radius, priceRange, date, titles, PollItems } = this.props;
		const categoryList = titles.join(', ');
		const restaurantList = this.state.restaurants.map((restaurant, index) => {
			return (
				<RestaurantCard
					key={index}
					currentIndex={index}
					delete={this.deleteRestaurant}
					currentRes={restaurant}
				/>
			);
		});
		const listName =
			this.state.favorites === true ? (
				<input
					value={this.state.listName}
					type="text"
					placeholder="Enter a name for this list"
					onChange={(e) => this.handleChange(e, 'listName')}
				/>
			) : null;
		return (
			<div>
				<div>
					<h1>Review Selections</h1>
					{restaurantList}
				</div>
				<input type="checkbox" value={true} onChange={() => this.saveList()} />
				<label>Save this List to Favorites?</label>
				{listName}
				<div>
					<Link to="/wizard/step-3">
						<button>Previous</button>
					</Link>
					<button onClick={()=>this.ConfirmSettings()}>Next</button>
				</div>
			</div>
		);
	}
}

export default connect((state) => state, Actions)(StepFour);
