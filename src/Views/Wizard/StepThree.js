import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantFinder from './RestaurantFinder';
import './StepThree.css';
import removeImage from '../../removeImage.png'

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
		if(this.props.latitude && this.props.longitude){
		const { latitude, longitude, radius, categories, priceRange, date } = this.props;
		axios
			.get(
				`/poll/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&open_at=${date}&categories=${categories}&price=${priceRange}`
			)
      .then((results) => this.setState({ restaurants: results.data.businesses }));
      if(this.props.PollItems){
        this.setState({selected: this.props.PollItems})
      }}else{this.props.history.push('/wizard/step-1')}
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
	removeRestaurant = (index)=>{
		const selected = this.state.selected
		selected.splice(index,1)
		this.setState({selected})
	}
	render() {
		const restaurantId = this.state.selected.map(rest=> rest.id)
		const restaurantsList = this.state.restaurants.map((restaurant, index) => {
			return <RestaurantCard selected={restaurantId.includes(restaurant.id)} className='restaurant-card' key={index} addRestaurant={this.addRestaurant} currentRes={restaurant} />;
		});
		const doneButton =
			this.state.selected.length > 0 ? (
				<Link to="/wizard/step-4">
					<button onClick={()=> this.props.saveStepThree(this.state.selected)}>&rarr;</button>
				</Link>
      ) : <div></div>;
		const restaurantSearch = this.state.displaySearch === true ? <RestaurantFinder addRestaurant={this.addRestaurant}/> : null
	const selectedRestaurants = this.state.selected.map((rest, index)=> {return (<div key={index}>{rest.name} <img className='remove' src={removeImage} alt="delte" onClick={this.removeRestaurant}/></div>)})
		return (
			<div className="step-three">
			<h2>ADD RESTAURANTS (STEP 3 of 5)</h2>
				<div className="next">
        	<Link to='/wizard/step-2'>
        	<button>&larr;</button>
        	</Link>
					
					{doneButton}
				</div>
				
				<div className='step-header'>
					<h2>Select Restaurants to add to Poll</h2>
					<b4 /><h4>(Step 3 of 5)</h4>
				</div>


				<div className='selected-list'>
					{this.state.selected.length > 0 ?<div> <h2>Selected Restaurants</h2> {selectedRestaurants} </div> :null}
				</div>
				
				
      
			  <button onClick= {()=>this.showHideSearch()} className='search-button'>{this.state.displaySearch? "Hide Search": "Search for a Specific Restaurant"}</button>
        {restaurantSearch}
        
				<div className='restaurants-list'>
        {restaurantsList}
        </div>
			</div>
		);
	}
}
export default connect((state) => state, Actions)(StepThree);
