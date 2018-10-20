import React, { Component } from 'react';
import { categories } from '../../categoriesService';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/actions';
import removeImage from '../../removeImage.png'
import './StepTwo.css';


class StepTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: [],
			categories: categories,
			displayAll: false,
			displayToggle: true,
			display: 'top',
		};
	}
	componentWillMount(){
		if(this.props.latitude && this.props.longitude){
		if(this.props.catArray){
			this.setState({selected: this.props.catArray})
		}
	}else{this.props.history.push('/wizard/step-1')}
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
		if (this.state.display === 'top') {
			if (string === '') {
				return this.setState({ 
					categories: categories,
					displayAll: false,
					displayToggle: true, 
				});
			}
				this.setState({ 
					categories: categoriesFiltered,
					displayToggle: false,
					displayAll: true,
				});
			} else {
				if (string === '') {
					return this.setState({ 
						categories: categories,
						displayAll: true,
						displayToggle: true, 
					});
				}
					this.setState({ 
						categories: categoriesFiltered,
						displayToggle: false,
						displayAll: true,
					});
			}
		}
	saveCategoriesToState() {
		const titles = this.state.selected.map(category=> category.title)
		const categories = this.state.selected.map((category) => category.alias);
		const joinedCategories = categories.join(',');
		this.props.saveStepTwo(joinedCategories, titles, this.state.selected);
	}
	toggleCategoriesDisplay() {
		this.state.displayAll ?
			this.setState({ displayAll: false, display: 'top' })
			: this.setState({ displayAll: true, display: 'all' });
	}
	render() {
		const categoriesList = 
		this.state.displayAll ? (
		this.state.categories.map((category, index) => {
			return (
				<div className= 'category-container' onClick={() => this.selectCategory(category)} key={index}>
					{category.title}
				</div>
			);
		})
		) : this.state.categories.map((category, index) => {
			if (category.top) {
				return (
					<div className= 'category-container' onClick={() => this.selectCategory(category)} key={index}>
						{category.title}
					</div>
				);
			}
		});
		const toggleCategories = 
		this.state.displayAll ? (
			<button onClick={() => this.toggleCategoriesDisplay()}>Show Top Categories</button>
		) : <button onClick={() => this.toggleCategoriesDisplay()}>Show All Categories</button>
		const selected = this.state.selected.map((category, index) => {
			return (
				<div id="remove-button" key={index}>
					{category.title} <img src={removeImage} className='remove' onClick={() => this.removeCategory(index)}/>
				</div>
			);
		});
		const nextButton= this.state.selected.length > 0 ? <Link to="/wizard/step-3">
		<button id="next-button" onClick={() => this.saveCategoriesToState()}>Next</button>
	</Link> : <div></div>
		return (
			<div className="step-two">
			<h2>SELECT CATEGORIES (STEP 2 of 5)</h2>
				<div className="next">
					<Link to="/wizard/step-1">
						<button id="next-button">Previous</button>
					</Link>
					{nextButton}
					
				</div>
				<p>Choose some categories that interest you</p>
				<h2>Selected Categories:</h2>
				<div className='selected'>
					{selected}
				</div>
				<hr />
				<input placeholder='Search for a category' type="text" onChange={(e) => this.filerCategories(e.target.value)} />
				<div className='categories-list'>{categoriesList}</div>
				{ this.state.displayToggle ? <div> {toggleCategories} </div> : null }
			</div>
		);
	}
}
export default connect((state) => state, Actions)(StepTwo);
