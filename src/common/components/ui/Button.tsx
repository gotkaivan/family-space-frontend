import { MouseEventHandler, useMemo } from 'react';

type ButtonType = 'base' | 'custom';

interface IProps {
	title: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	disabled?: boolean;
	clickHandler?: MouseEventHandler;
	bgColor?: string;
	textColor?: string;
	className?: string;
	buttonType?: ButtonType;
}

const Button = ({ title, leftIcon, rightIcon, clickHandler, disabled = false, bgColor, className = '', buttonType = 'base' }: IProps) => {
	const classes = useMemo(() => {
		switch (buttonType) {
			case 'base':
				return `flexCenter gap-3 cursor-pointer rounded-lg border transition hover:bg-opacity-90 ${className}
        ${bgColor ? bgColor : 'border-primary bg-primary'}`;
			default:
				return className;
		}
	}, [buttonType, className]);

	return (
		<button
			type="button"
			disabled={disabled}
			className={classes}
			onClick={clickHandler}
		>
			{leftIcon && leftIcon}
			{title}
			{rightIcon && rightIcon}
		</button>
	);
};

export default Button;
