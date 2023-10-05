import { FC } from 'react';
import Icon from './Icon';

interface IProps {
	text?: string;
	className?: string;
	disabled?: boolean;
	id: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

const Checkbox: FC<IProps> = ({ text = '', id, value, onChange, disabled = false, className = '' }) => {
	const onChangeHandler = () => {
		if (!disabled) {
			onChange(!value);
		}
	};
	return (
		<div className={`mb-4 ${className}`}>
			<label
				htmlFor={id}
				className="flex cursor-pointer select-none items-center"
				onChange={onChangeHandler}
			>
				<div className="relative">
					<input
						disabled={disabled}
						type="checkbox"
						id={id}
						className="sr-only"
					/>
					<div
						className={`mr-4 flex h-5 w-5 items-center justify-center rounded border bg-gray dark:bg-transparent ${
							disabled ? 'border-gray-light dark:border-gray-light' : 'border-primary dark:border-bodydark1'
						}`}
					>
						<span className={` ${disabled ? 'text-gray-light dark:text-gray-light' : 'text-primary dark:text-bodydark1'} ${value ? '!opacity-100' : 'opacity-0'}`}>
							<Icon
								name={'check'}
								size={10}
							/>
						</span>
					</div>
				</div>
				{text && <div className={`text-sm ${disabled && 'text-gray-light'}`}>{text}</div>}
			</label>
		</div>
	);
};

export default Checkbox;
