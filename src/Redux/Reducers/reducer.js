import { combineReducers } from 'redux';

const initialState = {
	address: null,
	longitude: null,
	latitude: null,
	radius: null,
	priceRange: null,
	date: null,
	formattedDate: null,
	showDate: null
};

function wizardSteps(state = initialState, action) {
	switch (action.type) {
		case 'WIZARD_STEP_ONE':
			return Object.assign({}, state, {
				address: action.payload.address,
				longitude: action.payload.longitude,
				latitude: action.payload.latitude,
				radius: action.payload.radius,
				priceRange: action.payload.priceRange,
				date: action.payload.date,
				formattedDate: action.payload.formattedDate,
				showDate: action.payload.showDate
			});
		case 'WIZARD_STEP_TWO':
			return Object.assign({}, state, { categories: action.payload.categories, titles: action.payload.titles, catArray: action.payload.catArray});
		case 'WIZARD_STEP_THREE':
			return Object.assign({}, state, {PollItems: action.payload})	
		case "WIZARD_STEP_FIVE":
			return Object.assign({}, state, {url: action.payload.url, code: action.payload.code})	
		case "VERIFIED_USER":
			return Object.assign({}, state, {loggedIn: action.payload.loggedIn})
		case "UPDATE_LOCATION":
			return Object.assign({}, state, {latitude: action.payload.latitude, longitude: action.payload.longitude})
		case "RE_ROUTE":
			return Object.assign({}, state, {sendToWi: action.payload})	
		case "CLEAR_POLL":
			return Object.assign({}, state, initialState)	
			
		default:
			return state;
	}
}
export default wizardSteps;
