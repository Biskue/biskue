import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import removeImage from '../../removeImage.png';

class EditFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoritesLists: [],
			loading: true
		};
	}
	componentWillMount() {
		axios.get('lists/').then((response) => {
			console.log(response);
			this.setState({ favoritesLists: response.data, loading: false });
		});
	}
	getListItems(listId) {
		axios.get(`/lists/${listId}`).then((response) => {
			console.log(response);
			const restaurants = response.data.map((item) => item.listItem);
			this.props.saveStepThree(restaurants);
			this.props.saveListLocation(this.state.favoritesLists[0].latitude, this.state.favoritesLists[0].longitude);
			this.props.history.push('/wizard/step-4');
		});
	}
	deleteList(index, id) {
		const favorites = this.state.favorites;
		favorites.splice(index, 1);
		axios.delete('/lists/delete/' + id).then(() => {
			this.setState({ favorites });
		});
	}
	render() {
		const favoritesLists = this.props.deleteList
			? this.state.favoritesLists.map((list, index) => {
					return (
						<div className="list-names" key={index} onClick={() => this.getListItems(list.id)}>
							{list.listName}{' '}
							<img
								src={removeImage}
								onClick={() => this.deleteList(index, list.id)}
								alt="delete"
								className="remove"
							/>
						</div>
					);
				})
			: this.state.favoritesLists.map((list, index) => {
					return (
						<div className="list-names" key={index} onClick={() => this.getListItems(list.id)}>
							{list.listName}
						</div>
					);
				});
		const loading = this.state.loading ? 'Loading...' : favoritesLists;
		return <div>{loading}</div>;
	}
}
export default connect((state) => state, Actions)(EditFavorites);
