import { isEmail } from 'common/helpers';
import { useEffect, useMemo, useState } from 'react';

type ValidationType = 'isEmail' | 'required';

interface IValidationResponse {
	hasError: boolean;
	value: any;
	message: string;
}

interface IValidationState {
	values: Record<string, IValidationResponse>;
	hasError: boolean;
}

interface IValidationRule {
	fieldName: string;
	type: ValidationType;
	message: string;
	isActive: boolean | Function;
}

interface IProps<T> {
	defaultValues: T;
	validationOptions: IValidationRule[];
}

const useForm = <T extends Record<string, any>>({ defaultValues, validationOptions = [] }: IProps<T>) => {
	const memoizedDefaultValues = useMemo(() => {
		return defaultValues;
	}, [defaultValues]);

	const memoizedValidationOptions = useMemo(() => {
		return validationOptions;
	}, [validationOptions]);

	const [state, setState] = useState<T>(memoizedDefaultValues);

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const [validationState, setValidationState] = useState<IValidationState>(getValidationObject());

	useEffect(() => {
		const fields = Object.keys(memoizedDefaultValues);
		fields.forEach(() => {
			memoizedValidationOptions.forEach(rule => {
				const isActive = checkIsActive(rule);
				if (rule.fieldName in state) {
					const value = state[rule.fieldName];
					if (rule.type === 'isEmail') {
						const values = validationState.values;
						values[rule.fieldName] = {
							hasError: !isEmail(value) && isTouched && isActive ? true : false,
							value,
							message: rule.message,
						};
						setValidationState({
							hasError: validationState.hasError,
							values: values,
						});
					}

					if (rule.type === 'required') {
						const values = validationState.values;
						values[rule.fieldName] = {
							hasError: !value && isTouched && isActive,
							value,
							message: rule.message,
						};
						setValidationState({
							hasError: validationState.hasError,
							values,
						});
					}
				}
			});
		});

		checkValidationErrors();
	}, [state, isTouched]);

	function checkIsActive(option: IValidationRule) {
		return typeof option.isActive === 'function' ? option.isActive(state) : option.isActive;
	}

	function checkValidationErrors() {
		let hasError = false;
		const state = Object.values(validationState.values);
		state.forEach(s => {
			if (!!s.hasError && !!isTouched) hasError = true;
		});

		setValidationState({
			values: validationState.values,
			hasError,
		});
	}

	function getValidationObject(): IValidationState {
		const rulesState: Record<string, IValidationResponse> = {};

		memoizedValidationOptions.forEach(rule => {
			if (rule.type === 'isEmail') rulesState[rule.fieldName] = { hasError: false, value: state[rule.fieldName], message: rule.message };
			if (rule.type === 'required') rulesState[rule.fieldName] = { hasError: false, value: state[rule.fieldName], message: rule.message };
		});

		return {
			values: rulesState,
			hasError: false,
		};
	}

	return {
		state,
		isTouched,
		validationState,
		setState,
		setIsTouched,
	};
};

export default useForm;
