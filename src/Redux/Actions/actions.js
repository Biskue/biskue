import { categories } from '../../categoriesService';

export const saveStepOne = (object) => {
	return {
		type: 'WIZARD_STEP_ONE',
		payload: object
	};
};
export const saveStepTwo = (categories) => {
	return {
		type: 'WIZARD_STEP_TWO',
		payload: categories
	};
};
export const saveStepThree = (restaurants) => {
	return {
		type: 'WIZARD_STEP_THREE',
		payload: restaurants
	}
}
