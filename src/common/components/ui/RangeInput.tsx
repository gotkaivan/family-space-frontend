import { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react';

type InputType = 'auth' | 'base' | 'custom';

type InputSize = 'sm' | 'md' | 'lg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
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
	value: number;
	min?: number;
	max: number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DEFAULT_ERROR_MESSAGE = '';

const RangeInput: FC<IProps> = ({
	label,
	className = '',
	inputClassName = '',
	hasError = false,
	errorMessage = DEFAULT_ERROR_MESSAGE,
	icon,
	left = null,
	right = null,
	withError = true,
	min = 1,
	max,
	disabled = false,
	value,
	onChange,
}) => {
	const getIocn = () => {
		return <span className="absolute right-4 top-4">{icon}</span>;
	};

	const getInputClasses = useMemo(() => {
		return `w-full rounded-md border bg-white  focus-visible:outline-none  dark:bg-boxdark py-3 px-4.5  ${
			hasError ? 'border-danger' : 'border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary'
		} ${inputClassName}`;
	}, [hasError, inputClassName]);

	const getErrorMessage = () => {
		if (!withError) return null;
		return hasError ? <p className="text-danger text-sm mt-2">{errorMessage}</p> : <p className="text-sm opacity-0">Error</p>;
	};

	return (
		<div className={'mb-4 w-full ' + className}>
			{label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
			<div className="flex gap-2.5">
				{left}
				<div className="relative w-full">
					<input
						value={value}
						onInput={onChange}
						type="number"
						disabled={disabled}
						className={getInputClasses}
					/>
					{icon && getIocn()}
				</div>
				{right}
			</div>
			<div className="mt-2">
				<input
					id="medium-range"
					type="range"
					min={min}
					max={max}
					value={value}
					onChange={onChange}
					className="w-full h-2 mb-6 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 dark:bg-boxdark"
				></input>
			</div>
			{getErrorMessage()}
		</div>
	);
};

export default RangeInput;
