import React, { FC, InputHTMLAttributes, useMemo } from 'react';
import Icon from './Icon';
import { IconName } from '../icons/types';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	iconName: IconName;
	size?: number;
	onClick: () => void;
	buttonSize?: 'sm' | 'md' | 'lg';
}

const SquareButton: FC<IProps> = ({ onClick, iconName, size = 20, buttonSize }) => {
	const buttonSizeClasses = useMemo(() => {
		return buttonSize === 'sm' ? 'p-2 h-10.5 w-10.5' : 'p-4 h-12.5 w-12.5';
	}, [buttonSize]);

	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center rounded-md border border-stroke bg-white hover:text-primary dark:border-strokedark dark:bg-boxdark ${buttonSizeClasses}`}
		>
			<Icon
				name={iconName}
				width={size}
				height={size}
			/>
		</button>
	);
};

export default SquareButton;
