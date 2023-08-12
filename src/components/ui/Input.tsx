import React, { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: JSX.Element;
	className?: string;
	hasError?: boolean;
	errorMessage?: string;
}

const DEFAULT_ERROR_MESSAGE = '';

const Input: React.FC<IProps> = ({ label, className = '', hasError = false, errorMessage = DEFAULT_ERROR_MESSAGE, icon, ...rest }) => {
	const getIocn = () => {
		return <span className="absolute right-4 top-4">{icon}</span>;
	};

	const getErrorMessage = () => {
		return hasError ? <p className="text-danger text-sm mt-2">{errorMessage}</p> : <p className="text-sm opacity-0">Error</p>;
	};

	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}

			<div className="relative">
				<input
					{...rest}
					className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
						hasError ? 'border-danger' : 'border-stroke'
					}`}
				/>
				{icon && getIocn()}
			</div>

			{getErrorMessage()}
		</div>
	);
};

export default Input;
