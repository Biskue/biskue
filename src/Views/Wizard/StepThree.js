import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantFinder from './RestaurantFinder'

class StepThree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
      selected: [],
      displaySearch: false,
		};
	}
	componentWillMount() {
		const { latitude, longitude, radius, categories, priceRange, date } = this.props;
		axios
			.get(
				`/poll/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&open_at=${date}&categories=${categories}&price=${priceRange}`
			)
      .then((results) => this.setState({ restaurants: results.data.businesses }));
      if(this.props.PollItems){
        this.setState({selected: this.props.PollItems})
      }
	}
	addRestaurant = (restaurant) => {
		const selected = this.state.selected;
		selected.push(restaurant);
		this.setState({ selected });
	};
  showHideSearch(){
    if(this.state.displaySearch=== true){
      this.setState({displaySearch: false})
    }else{
      this.setState({displaySearch: true})
    }
  }
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
    const restaurantSearch = this.state.displaySearch === true ? <RestaurantFinder addRestaurant={this.addRestaurant}/> : null
		return (
			<div>
				<h2>Select Restaurants to add to Poll</h2>
        <Link to='/wizard/step-2'>
        <button>Previous</button>
        </Link>
        <button onClick= {()=>this.showHideSearch()}>Search for a Specific Restaurant</button>
        {restaurantSearch}
        <div>
				{doneButton}
        {restaurantsList}
        </div>
			</div>
		);
	}
}
export default connect((state) => state, Actions)(StepThree);
