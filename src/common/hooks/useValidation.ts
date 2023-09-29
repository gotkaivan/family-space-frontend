import { isEmail } from 'common/helpers';
import { useEffect, useState } from 'react';

interface IValidationType {
	isEmail?: boolean;
	isEmpty?: boolean;
	minLength?: number;
	maxLength?: number;
}

interface IValidationResponse {
	isEmail?: boolean;
	isEmpty?: boolean;
	minLength?: boolean;
	maxLength?: boolean;
}

interface IValidationState {
	values: IValidationResponse;
	hasError: boolean;
}

interface IValidationRule {
	fieldName: string;
	validationTypes: IValidationType;
}

const useValidation = <T extends Record<string, any>>(form: T, rules: IValidationRule) => {
	console.log('form', form);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [validationState, setValidationState] = useState(getValidationObject());

	const fields = Object.keys(form);

	useEffect(() => {
		fields.forEach(name => {
			if (form[name]) {
				const value = form[name];
				if (rules.validationTypes.isEmail) {
					setValidationState({
						hasError: validationState.hasError,
						values: {
							...validationState.values,
							isEmail: isTouched && !isEmail(value) ? false : true,
						},
					});
				}

				if (rules.validationTypes.isEmpty) {
					setValidationState({
						hasError: validationState.hasError,
						values: {
							...validationState.values,
							isEmpty: isTouched && !value ? true : false,
						},
					});
				}
			}
		});

		setValidationState;
	}, [form]);

	function getValidationObject(): IValidationState {
		const rulesState: IValidationResponse = {};
		if (rules.validationTypes.isEmail) rulesState.isEmail = false;
		if (rules.validationTypes.isEmpty) rulesState.isEmpty = true;

		return {
			values: rulesState,
			hasError: false,
		};
	}

	return {
		isTouched,
		setIsTouched,
		validationState,
		form,
	};
};

export default useValidation;
