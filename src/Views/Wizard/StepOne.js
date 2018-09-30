import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLatitudeLongitude } from './GeoCodeHelper';
import * as Actions from '../../Redux/Actions/actions';

class StepOne extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			distance: 10,
			priceRange: [],
			latitude: null,
			longitude: null
		};
	}
	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}

	getLocation = () => {
		console.log('checking location');
		window.navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);

			this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
		});
	};
	handlePriceChange(e) {
		const priceRange = this.state.priceRange;
		if (priceRange.includes(e.target.value)) {
			priceRange.splice(priceRange.indexOf(e.target.value), 1);
		} else {
			priceRange.push(e.target.value);
		}
		this.setState({ priceRange: priceRange });
	}
	getLocationByAddress(address) {
		getLatitudeLongitude(address).then((response) => console.log(response));
	}
	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Enter City and State or Zip"
					onChange={(e) => this.handleChange(e, 'address')}
				/>
				<button onClick={() => this.getLocationByAddress(this.state.address)}>Search</button>
				<div>
					<button onClick={this.getLocation}>Use Current Location</button>
				</div>
				<div>
					<b>Distance:</b>
					<input
						type="range"
						min={5}
						max={25}
						value={this.state.distance}
						step={5}
						onChange={(e) => this.handleChange(e, 'distance')}
					/>{' '}
					{this.state.distance + ' Miles'}
				</div>
				<div>
					<b>Price Range</b>
					$10 Or less{' '}
					<input
						type="checkbox"
						value={1}
						onClick={(e) => {
							this.handlePriceChange(e);
						}}
					/>
					$11-$30{' '}
					<input
						type="checkbox"
						value={2}
						onChange={(e) => {
							this.handlePriceChange(e);
						}}
					/>
					$31-$60{' '}
					<input
						type="checkbox"
						value={3}
						onChange={(e) => {
							this.handlePriceChange(e);
						}}
					/>
					$61+{' '}
					<input
						type="checkbox"
						value={4}
						onChange={(e) => {
							this.handlePriceChange(e);
						}}
					/>
				</div>
				<div>
					<Link to="/wizard/step-2">
						<button onClick={() => this.saveWhereToState()}>Next</button>
					</Link>
				</div>
			</div>
		);
	}
	saveWhereToState() {
		const results = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			radius: this.state.distance,
			priceRange: this.state.priceRange
		};
		this.props.saveStepOne(results);
	}
}
export default connect((state) => state, Actions)(StepOne);
