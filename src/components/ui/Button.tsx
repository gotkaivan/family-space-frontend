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

const Button = ({ title, leftIcon, rightIcon, clickHandler, disabled = false, bgColor, className = '' }: Props) => (
	<button
		type="button"
		disabled={disabled}
		className={`flexCenter gap-3 w-full cursor-pointer rounded-lg border transition hover:bg-opacity-90 ${className}
        ${bgColor ? bgColor : 'border-primary bg-primary'}`}
		onClick={clickHandler}
	>
		{leftIcon && leftIcon}
		{title}
		{rightIcon && rightIcon}
	</button>
);

export default Button;
