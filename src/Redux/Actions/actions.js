import { categories } from '../../categoriesService';

export const saveStepOne = (object) => {
	return {
		type: 'WIZARD_STEP_ONE',
		payload: object
	};
};
export const saveStepTwo = (categories, titles, array) => {
	return {
		type: 'WIZARD_STEP_TWO',
		payload: {categories: categories,
			titles: titles,
			catArray: array,
		}
	};
};
export const saveStepThree = (restaurants) => {
	return {
		type: 'WIZARD_STEP_THREE',
		payload: restaurants
	}
}
export const saveStepFive = (url, code) =>{
	return {
		type: "WIZARD_STEP_FIVE",
		payload: {
			url,
			code
		}
	}
}

export const verifyAuth = (loggedIn) => {
	return {
		type: 'VERIFIED_USER',
		payload: {loggedIn},
	}
}
export const saveListLocation = (latitude, longitude) => {
	return{
		type: "UPDATE_LOCATION",
		payload: {
			latitude,
			longitude
		}
	}
}
export const reRoute = (boolean)=> {
	return {
		type: "RE_ROUTE",
		payload: boolean
	}
}