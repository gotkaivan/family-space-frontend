import { FC, InputHTMLAttributes, useMemo } from 'react';

type InputType = 'auth' | 'base' | 'custom';

type InputSize = 'sm' | 'md' | 'lg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	icon?: JSX.Element;
	className?: string;
	inputClassName?: string;
	hasError?: boolean;
	errorMessage?: string;
	classesType?: InputType;
	right?: JSX.Element | null;
	left?: JSX.Element | null;
	withError?: boolean;
	inputSize?: InputSize;
	disabled?: boolean;
	register?: any;
}

const DEFAULT_ERROR_MESSAGE = '';

const Input: FC<IProps> = ({
	id,
	label,
	className = '',
	inputClassName = '',
	hasError = false,
	errorMessage = DEFAULT_ERROR_MESSAGE,
	icon,
	classesType = 'base',
	left = null,
	right = null,
	withError = true,
	inputSize = 'md',
	disabled = false,
	register,
	...rest
}) => {
	const getIocn = () => {
		return <span className="absolute right-4 top-4">{icon}</span>;
	};

	const size = useMemo(() => {
		return inputSize === 'sm' ? 'py-2 px-3' : 'py-3 px-4.5';
	}, [inputSize]);

	const getInputClasses = useMemo(() => {
		if (classesType === 'auth') {
			return `w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
				hasError ? 'border-danger' : 'border-stroke'
			} ${inputClassName}`;
		}

		if (classesType === 'base') {
			return `w-full text-sm rounded-md border bg-white  focus-visible:outline-none  dark:bg-boxdark  ${
				hasError ? 'border-danger' : 'border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary'
			} ${inputClassName} ${size}`;
		}
	}, [classesType, hasError]);

	const getErrorMessage = () => {
		if (!withError) return null;
		return hasError ? <p className="text-danger text-sm mt-2">{errorMessage}</p> : <p className="text-sm opacity-0">Error</p>;
	};

	return (
		<div className={'mb-4 w-full ' + className}>
			{label && <label className="mb-2.5 text-sm  block font-medium text-black dark:text-white">{label}</label>}
			<div className="flex gap-2.5">
				{left}
				<div className="relative w-full">
					<input
						id={id}
						name={id}
						disabled={disabled}
						className={getInputClasses}
						{...register}
						{...rest}
					/>
					{icon && getIocn()}
				</div>
				{right}
			</div>

			{getErrorMessage()}
		</div>
	);
};

export default Input;
