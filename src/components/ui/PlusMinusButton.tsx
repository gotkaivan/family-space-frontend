import React, { FC, InputHTMLAttributes } from 'react';
import Icon from './Icon';

type ButtonType = 'plus' | 'minus';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	type: ButtonType;
	size?: number;
	onClick: () => void;
}

const PlusMinusButton: FC<IProps> = ({ onClick, type, size = 20 }) => {
	return (
		<button
			onClick={onClick}
			className="flex h-12.5 w-12.5 items-center justify-center rounded-sm border border-stroke bg-white p-4 hover:text-primary dark:border-strokedark dark:bg-boxdark"
		>
			<Icon
				name={type}
				width={size}
				height={size}
			/>
		</button>
	);
};

export default PlusMinusButton;
