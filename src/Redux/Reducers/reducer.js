import { combineReducers } from 'redux';

const initialState = {};

function wizardSteps(state = initialState, action) {
	switch (action.type) {
		case 'WIZARD_STEP_ONE':
			return Object.assign({}, state, {
				address: action.payload.address,
				longitude: action.payload.longitude,
				latitude: action.payload.latitude,
				radius: action.payload.radius,
				priceRange: action.payload.priceRange,
				date: action.payload.date
			});
		case 'WIZARD_STEP_TWO':
			return Object.assign({}, state, { categories: action.payload.categories, titles: action.payload.titles, catArray: action.payload.catArray});
		case 'WIZARD_STEP_THREE':
			return Object.assign({}, state, {PollItems: action.payload})	
		case "WIZARD_STEP_FIVE":
			return Object.assign({}, state, {url: action.payload.url, code: action.payload.code})	
		default:
			return state;
	}
}
export default wizardSteps;
