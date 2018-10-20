import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Actions from '../../Redux/Actions/actions';
import RestaurantFinder from './RestaurantFinder'

import './StepFour.css';

class StepFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: this.props.PollItems,
			favorites: false,
      listName: '',
      displaySearch: false,
		};
	}
	componentWillMount(){
		if(this.props.latitude && this.props.longitude){
	}else{this.props.history.push('/wizard/step-1')}
	}
	deleteRestaurant = (index) => {
		const restaurants = this.state.restaurants;
    restaurants.splice(index, 1);
    this.props.saveStepThree(restaurants)
		this.setState({ restaurants });
	};
	saveList() {
		if (this.state.favorites === true) {
			return this.setState({ favorites: false });
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
  showHideSearch(){
    if(this.state.displaySearch=== true){
      this.setState({displaySearch: false})
    }else{
      this.setState({displaySearch: true})
    }
  }
  addRestaurant = (restaurant) => {
		const selected = this.state.restaurants;
    selected.push(restaurant);
    this.props.saveStepThree(selected)
		this.setState({ restaurants: selected });
	};
	render() {
		const { longitude, latitude, radius, priceRange, date, titles, PollItems } = this.props;
		
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
      const restaurantSearch = this.state.displaySearch === true ? <RestaurantFinder addRestaurant={this.addRestaurant}/> : null
		return (
			<div className="step-four">
<<<<<<< HEAD
				
				<div className="next">
					<Link to="/wizard/step-3">
						<button>&larr;</button>
					</Link>
					<button className='next-step' onClick={()=>this.ConfirmSettings()}>&rarr;</button>
=======
				<h2>REVIEW SELECTIONS (STEP 4 of 5)</h2>
				<div className="next">
					<Link to="/wizard/step-3">
						<button id="next-button">Previous</button>
					</Link>
					<button id="next-button" className='next-step' onClick={()=>this.ConfirmSettings()}>Next</button>
>>>>>>> master
				</div>
				
				<div className='inputGroup check-favorites'>
					<input id='favorites-box' type="checkbox" value={true} onChange={() => this.saveList()} />
				<label htmlFor='favorites-box'>Save this List to Favorites?</label>
				</div>
				
				<div>
				{listName}
				</div>
				
				
				<div>
<<<<<<< HEAD
					<div className='step-header'>
						<h2>Review Selections</h2>
						<br /><h4>(Step 4 of 5)</h4>
					</div>
          
					<div>
            <button onClick={()=> this.showHideSearch()} className='search-button'>Add Restaurant</button>
=======
				
          <div>
            <button onClick={()=> this.showHideSearch()}>Add Restaurant</button>
>>>>>>> master
            <div>{restaurantSearch}</div>
          </div>

					<div className='restaurants-list'>
					{restaurantList}
					</div>
				</div>
			

			</div>
		);
	}
}

export default connect((state) => state, Actions)(StepFour);
