import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';

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
      console.log(response)
			this.setState({ favoritesLists: response.data, loading: false });
		});
	}
 getListItems(listId){
   axios.get(`/lists/${listId}`).then(response => {
     console.log(response)
     const restaurants = response.data.map(item => item.listItem)
     this.props.saveStepThree(restaurants)
     this.props.history.push('/wizard/step-4')
   })
 }
	render() {
		const favoritesLists = this.state.favoritesLists.map((list, index) => {
			return (
				<div key={index}>
					{list.listName}{' '}
					
						<button onClick={() => this.getListItems(list.id)}>Select</button>
					
				</div>
			);
    });
    const loading = this.state.loading ? "Loading..." : favoritesLists
		return <div>
     {loading}
    </div>;
	}
}
export default connect((state) => state, Actions)(EditFavorites);
