import { combineReducers } from 'redux';

const initialState = {};

function wizardSteps(state = initialState, action) {
	switch (action.type) {
		case 'WIZARD_STEP_ONE':
			return Object.assign({}, state, {
				longitude: action.payload.longitude,
				latitude: action.payload.latitude,
				radius: action.payload.radius,
				priceRange: action.payload.priceRange,
				date: action.payload.date
			});
		case 'WIZARD_STEP_TWO':
			return Object.assign({}, state, { categories: action.payload });
		case 'WIZARD_STEP_THREE':
			return Object.assign({}, state, {PollItems: action.payload})	
		default:
			return state;
	}
}
export default wizardSteps;
