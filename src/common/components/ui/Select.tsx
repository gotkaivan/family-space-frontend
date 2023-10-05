import { FC, SelectHTMLAttributes, useMemo } from 'react';

export interface ISelectOption {
	id: number;
	value: string | number;
	title: string;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
	id: string;
	value: any;
	label?: string;
	left?: JSX.Element;
	className?: string;
	disabled?: boolean;
	hasError?: boolean;
	errorMessage?: string;
	options: ISelectOption[];
	defaultValue?: string;
	register?: any;
}

const Select: FC<IProps> = ({ id, label = '', value, left, options, className, disabled = false, register, defaultValue, ...rest }) => {
	const textColor = useMemo(() => {
		return !!value ? '' : 'text-bodydark2';
	}, [value]);

	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 text-sm block font-medium text-black dark:text-white">{label}</label>}

			<div className="relative bg-white dark:bg-form-input">
				{left && <span className="absolute top-1/2 left-4 -translate-y-1/2">{left}</span>}

				<select
					id={id}
					value={value}
					name={id}
					disabled={disabled}
					{...register}
					{...rest}
					className={`relative text-sm appearance-none border-stroke bg-transparent py-3 outline-none transition active:border-primary  w-full rounded-md border bg-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary ${textColor} ${
						left ? 'px-12' : 'px-4.5'
					}`}
				>
					{defaultValue && (
						<option
							key={null}
							value={''}
						>
							{defaultValue}
						</option>
					)}
					{options.map(option => {
						return (
							<option
								key={option.id}
								value={option.value}
							>
								{option.title}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default Select;
