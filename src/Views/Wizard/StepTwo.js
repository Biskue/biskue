import React, { Component } from 'react';
import { categories } from '../../categoriesService';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import './StepTwo.css';


class StepTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			categories: categories
		};
	}
	componentWillMount(){
		if(this.props.catArray){
			this.setState({selected: this.props.catArray})
		}
	}
	selectCategory(category) {
		const selectCategories = this.state.selected;
		selectCategories.push(category);
		this.setState({ selected: selectCategories });
	}
	removeCategory(index) {
		const selected = this.state.selected;
		selected.splice(index, 1);
		this.setState({ selected });
	}
	filerCategories(string) {
		const categoriesCopied = this.state.categories;
		const categoriesFiltered = categoriesCopied.filter((category) =>
			category.title.toLowerCase().includes(string.toLowerCase())
		);
		if (string === '') {
			return this.setState({ categories: categories });
		}
		this.setState({ categories: categoriesFiltered });
	}
	saveCategoriesToState() {
		const titles = this.state.selected.map(category=> category.title)
		const categories = this.state.selected.map((category) => category.alias);
		const joinedCategories = categories.join(',');
		this.props.saveStepTwo(joinedCategories, titles, this.state.selected);
	}
	render() {
		const categoriesList = this.state.categories.map((category, index) => {
			return (
				<div className= 'category-container' onClick={() => this.selectCategory(category)} key={index}>
					{category.title}
				</div>
			);
		});
		const selected = this.state.selected.map((category, index) => {
			return (
				<div id="remove-button" key={index}>
					<h3>{category.title}</h3> <span className='remove' onClick={() => this.removeCategory(index)}>Remove</span>
				</div>
			);
		});
		return (
			<div className="step-two">
				<div className="next">
					<Link to="/wizard/step-1">
						<button>Previous</button>
					</Link>
					<Link to="/wizard/step-3">
						<button onClick={() => this.saveCategoriesToState()}>Next</button>
					</Link>
				</div>

				<h2>selected</h2>
				<div className='selected'>
					{selected}
				</div>

				<hr />

				<input type="text" onChange={(e) => this.filerCategories(e.target.value)} />
				<div className='categories-list'>{categoriesList}</div>
			</div>
		);
	}
}
export default connect((state) => state, Actions)(StepTwo);
