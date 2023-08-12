import React, { MouseEventHandler } from 'react';

type Props = {
	title: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	disabled?: boolean;
	clickHandler?: MouseEventHandler;
	bgColor?: string;
	textColor?: string;
	className?: string;
};

const Button = ({ title, leftIcon, rightIcon, clickHandler, disabled = false, bgColor, textColor, className = '' }: Props) => (
	<button
		type="button"
		disabled={disabled}
		className={`flexCenter gap-3 w-full cursor-pointer rounded-lg border p-4 transition hover:bg-opacity-90
        ${textColor ? textColor : 'text-white'}
        ${bgColor ? bgColor : 'border-primary bg-primary'} ${className}`}
		onClick={clickHandler}
	>
		{leftIcon && leftIcon}
		{title}
		{rightIcon && rightIcon}
	</button>
);

export default Button;
