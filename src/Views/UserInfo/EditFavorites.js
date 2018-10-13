import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';

class EditFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoritesLists: []
		};
	}
	componentWillMount() {
		axios.get('lists/savedLists/').then((response) => {
      console.log(response)
			this.setState({ favoritesLists: response.data });
		});
	}
 getListItems(listId){
   axios.get(`/lists/list/${listId}`).then(response => {
     this.props.saveStepThree(response.data)
     this.props.history.push('/wizard/step-4')
   })
 }
	render() {
		const favoritesLists = this.state.favoritesLists.map((list, index) => {
			return (
				<div key={index}>
					{list.listName}{' '}
					
						<button onClick={() => this.getListItems(list.listId)}>Select</button>
					
				</div>
			);
		});
		return <div>
      {favoritesLists}
    </div>;
	}
}
export default connect((state) => state, Actions)(EditFavorites);
