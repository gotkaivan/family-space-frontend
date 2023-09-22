import { ChangeEvent, FC, SelectHTMLAttributes } from 'react';
import Icon from './Icon';

export interface ISelectOption {
	id: number;
	value: string | number;
	title: string;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	left?: JSX.Element;
	className?: string;
	disabled?: boolean;
	hasError?: boolean;
	errorMessage?: string;
	withError?: boolean;
	value: string | number | readonly string[] | undefined;
	options: ISelectOption[];
	onChange: (e: ChangeEvent) => void;
}

const Select: FC<IProps> = ({ label = '', left, value, options, className, onChange, disabled = false }) => {
	return (
		<div className={'mb-4 ' + className}>
			{label && <label className="mb-2.5 text-sm block font-medium text-black dark:text-white">{label}</label>}

			<div className="relative bg-white dark:bg-form-input">
				{left && <span className="absolute top-1/2 left-4 -translate-y-1/2">{left}</span>}

				<select
					value={value}
					disabled={disabled}
					onChange={onChange}
					className={`relative text-sm appearance-none border-stroke bg-transparent py-3 outline-none transition active:border-primary  w-full rounded-md border bg-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary ${
						left ? 'px-12' : 'px-4.5'
					}`}
				>
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
