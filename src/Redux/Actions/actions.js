import { categories } from '../../categoriesService';

export const saveStepOne = (object) => {
	return {
		type: 'WIZARD_STEP_ONE',
		payload: object
	};
};
export const saveStepTwo = (categories, titles) => {
	return {
		type: 'WIZARD_STEP_TWO',
		payload: {categories: categories,
			titles: titles
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
