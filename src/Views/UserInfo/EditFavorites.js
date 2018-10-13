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
			this.setState({ favoritesLists: response.data });
		});
	}

	render() {
		const favoritesLists = this.state.favoritesLists.map((list, index) => {
			return (
				<div key={index}>
					{list.listName}{' '}
					<Link to="/wizard/step-4">
						<button onClick={() => this.props.saveStepThree(list.listItems)}>Select</button>{' '}
					</Link>
				</div>
			);
		});
		return <div>
      {favoritesLists}
    </div>;
	}
}
export default connect((state) => state, Actions)(EditFavorites);
