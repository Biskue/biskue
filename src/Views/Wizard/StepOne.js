import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Wizard.css'
import * as Actions from '../../Redux/Actions/actions';
import Geocode from 'react-geocode';
import date from 'date-and-time';
import './StepOne.css';

class StepOne extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			distance: 10,
			priceRange: [],
			latitude: null,
			longitude: null,
			date: date.format(new Date(),`YYYY-MM-DD${'T'}HH:mm`),
			showDateSelector: false,
			price1: false,
			price2: false,
			price3: false,
			price4: false
		};
	}
	componentWillMount(){
		axios.get('/auth/login').then((response)=>{
		console.log(response)
	if(this.props.address){
		this.setState({
			address: this.props.address,
			distance: this.props.radius/1609,
			priceRange: this.props.priceRange.split(','),
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			date: this.props.formattedDate,
			showDateSelector: this.props.showDate,
			price1: this.props.priceRange.includes(1),
			price2: this.props.priceRange.includes(2),
			price3: this.props.priceRange.includes(3),
			price4: this.props.priceRange.includes(4)
		})
	}
})
.catch((err)=> {console.log(err); this.props.reRoute(true); this.props.history.push('/login') })	
	}
	handleChange(event, name) {
		const value = event.target.value;
		if(name === 'distance'){
			return this.setState({[name]: Number(value)})
		}
		this.setState({ [name]: value });
	}
	saveLatLong(string) {
		Geocode.fromAddress(string).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				console.log(lat, lng);
				this.setState({ latitude: lat, longitude: lng });
			},
			(error) => {
				console.error(error);
			}
		);
	}
	getLocation = () => {
		console.log('checking location');
		window.navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then((response)=> {
				this.setState({address: response.results[3].formatted_address})
			})
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
	handlePriceSelection(name){
		if(this.state[name]=== true){
			this.setState({[name]: false})
		}else{
			this.setState({[name]: true})
		}
	}

	render() {
		
		const dateSelector =
			this.state.showDateSelector === 'true' ? (
				<input type="datetime-local" value={this.state.date}  onChange={(e) => this.handleChange(e, 'date')} />
			) : null;
		const nextButton =
			this.state.latitude != null && this.state.longitude != null ? (
				<Link to="/wizard/step-2">
					<button onClick={() => this.saveWhereToState()} id="next-button">Next</button>
				</Link>
			) : null;
		return (
			<div className='step-one'>

				<div className='next'>
					{nextButton}
				</div>
				

				<div className='location'>

						<input
							type="text"
							placeholder="Enter City and State or Zip"
							onChange={(e) => this.handleChange(e, 'address')}
							value={this.state.address}
							/>
						<button onClick={() => this.saveLatLong(this.state.address)}>Search</button>
					<break></break>
					<button onClick={this.getLocation}>Use Current Location</button>
				</div>
				

				<h2>Distance</h2>
				<div className='distance'>
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
				

				<h2>Price Range</h2>
				<div className='price-range'>
					<div>$10 Or less{' '}
						<input
							type="checkbox"
							checked = {this.state.price1}
							onClick = {()=> this.handlePriceSelection('price1')}
							value={1}
							onChange={(e) => {
								this.handlePriceChange(e);
							}}
							/>
					</div>
					<div>$11-$30{' '}
						<input
							type="checkbox"
							checked ={this.state.price2}
							onClick = {()=> this.handlePriceSelection('price2')}
							value={2}
							onChange={(e) => {
								this.handlePriceChange(e);
							}}
						/>
					</div>
					<div>$31-$60{' '}
						<input
							type="checkbox"
							checked ={this.state.price3}
							onClick = {()=> this.handlePriceSelection('price3')}
							value={3}
							onChange={(e) => {
								this.handlePriceChange(e);
							}}
						/>
					</div>
					<div>$61+{' '}
						<input
							type="checkbox"
							checked ={this.state.price4}
							onClick = {()=> this.handlePriceSelection('price4')}
							value={4}
							onChange={(e) => {
								this.handlePriceChange(e);
							}}
						/>
					</div>
				</div>


				<h2>Show Restaurants</h2>
				<div className="show-restaurants">
					<div>
						<label>Open Now</label>
						<input
							type="radio"
							checked = {this.state.showDateSelector === false || this.state.showDateSelector=== 'false'}
							value={false}
							name="nowOrLater"
							onChange={(e) => this.handleChange(e, 'showDateSelector')}
							/>
					</div>

					<div>
					<label>Open Later</label>
						<input
							type="radio"
							checked = {this.state.showDateSelector === true || this.state.showDateSelector === 'true'}
							value={true}
							name="nowOrLater"
							onChange={(e) => this.handleChange(e, 'showDateSelector')}
							/>
					</div>
					<break></break>
					
					<div className="date-selector">
						{dateSelector}
					</div>

				</div>

				<div />

			</div>
		);
	}
	saveWhereToState() {
		const date = new Date(this.state.date);
		const timestamp = Math.ceil(date.getTime() / 1000);
		const prices = this.state.priceRange.join(',');
		const distance = this.state.distance*1609
		const results = {
			address: this.state.address,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			radius: distance,
			priceRange: prices,
			date: timestamp,
			formattedDate: this.state.date,
			showDate: this.state.showDateSelector
		};
		this.props.saveStepOne(results);
	}
}
export default connect((state) => state, Actions)(StepOne);
