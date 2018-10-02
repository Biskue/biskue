import { combineReducers } from 'redux';

const initialState = [];

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
		default:
			return state;
	}
}
export default wizardSteps;
